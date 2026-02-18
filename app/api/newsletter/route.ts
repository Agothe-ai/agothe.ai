import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.trim().toLowerCase(),
        source: source || 'unknown'
      })
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { success: true, message: 'Already subscribed' },
          { status: 200 }
        );
      }
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // Send notification email to research@agothe.ai
    // This will be handled by Netlify Forms webhook or edge function
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://agothe.ai'}/api/send-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: source === 'homepage-top' ? 'newsletter' : 'intel-brief',
          email: email.trim().toLowerCase(),
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Notification error:', err));
    } catch (err) {
      console.error('Failed to send notification:', err);
      // Don't fail the request if notification fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription successful',
        id: data.id
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
