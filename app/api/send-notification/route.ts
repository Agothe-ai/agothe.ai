import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.log('RESEND_API_KEY not configured. Submission logged:', body);
      return NextResponse.json(
        { success: true, message: 'Notification endpoint not configured.' },
        { status: 200 }
      );
    }

    const { type } = body;
    let subject = '';
    let html = '';

    if (type === 'contact') {
      const { name, email, service, message } = body;
      subject = `[Contact] ${name || 'Anonymous'} — ${service || 'General Inquiry'}`;
      html = `
        <h2 style="color:#00f0ff;font-family:monospace">New Contact Submission</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #00f0ff;padding-left:12px;color:#555">${message}</blockquote>
        <p style="color:#999;font-size:12px">Submitted at ${new Date().toISOString()}</p>
      `;
    } else {
      const { email, timestamp } = body;
      const label = type === 'newsletter' ? 'Newsletter' : 'Intel Brief';
      subject = `[${label}] New subscriber: ${email}`;
      html = `
        <h2 style="color:#00f0ff;font-family:monospace">New ${label} Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${type}</p>
        <p style="color:#999;font-size:12px">Subscribed at ${timestamp || new Date().toISOString()}</p>
      `;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Agothe AI <noreply@agothe.ai>',
        to: ['research@agothe.ai'],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend API error:', errText);
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Notification sent' }, { status: 200 });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
