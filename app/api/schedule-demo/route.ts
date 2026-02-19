import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'company',
      'role',
      'challenges',
      'companySize',
      'timeline',
      'budgetRange',
      'meetingType',
    ];

    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Insert demo request into database
    const { data, error } = await supabase
      .from('demo_requests')
      .insert({
        name: body.name,
        email: body.email,
        company: body.company,
        role: body.role,
        phone: body.phone || null,
        challenges: body.challenges,
        company_size: body.companySize,
        current_tools: body.currentTools || null,
        timeline: body.timeline,
        budget_range: body.budgetRange,
        preferred_date: body.preferredDate || null,
        preferred_time: body.preferredTime || null,
        meeting_type: body.meetingType,
        additional_notes: body.additionalNotes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save demo request' },
        { status: 500 }
      );
    }

    // Send notification email to research@agothe.ai (non-blocking)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const challengesList = Array.isArray(body.challenges)
        ? body.challenges.join(', ')
        : body.challenges;

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Agothe AI <noreply@agothe.ai>',
          to: ['research@agothe.ai'],
          subject: `[Demo Request] ${body.name} — ${body.company}`,
          html: `
            <h2 style="color:#00f0ff;font-family:monospace">New Demo Request</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Company:</strong> ${body.company}</p>
            <p><strong>Role:</strong> ${body.role}</p>
            <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
            <p><strong>Challenges:</strong> ${challengesList}</p>
            <p><strong>Company Size:</strong> ${body.companySize}</p>
            <p><strong>Current Tools:</strong> ${body.currentTools || 'Not provided'}</p>
            <p><strong>Timeline:</strong> ${body.timeline}</p>
            <p><strong>Budget Range:</strong> ${body.budgetRange}</p>
            <p><strong>Preferred Date:</strong> ${body.preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${body.preferredTime || 'Not specified'}</p>
            <p><strong>Meeting Type:</strong> ${body.meetingType}</p>
            <p><strong>Additional Notes:</strong> ${body.additionalNotes || 'None'}</p>
            <p style="color:#999;font-size:12px">Submitted at ${new Date().toISOString()} — ID: ${data.id}</p>
          `,
        }),
      }).catch(err => console.error('Resend notification error:', err));
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully',
        id: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
