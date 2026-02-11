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

    // TODO: Send confirmation email
    // TODO: Notify team via Slack/email

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
