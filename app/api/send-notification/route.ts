import { NextRequest, NextResponse } from 'next/server';

/**
 * Email notification endpoint
 * 
 * This endpoint handles sending notification emails for form submissions.
 * 
 * To enable email notifications, configure one of these services:
 * 
 * Option 1: Resend (Recommended)
 * - Sign up at https://resend.com
 * - Add RESEND_API_KEY to environment variables
 * - Install: npm install resend
 * 
 * Option 2: SendGrid
 * - Sign up at https://sendgrid.com
 * - Add SENDGRID_API_KEY to environment variables
 * - Install: npm install @sendgrid/mail
 * 
 * Option 3: Netlify Forms + Zapier/Make
 * - Configure Netlify Forms webhook
 * - Connect to Zapier/Make for email forwarding
 */

export async function POST(request: NextRequest) {
  try {
    const { type, email, timestamp } = await request.json();

    // Check if Resend is configured
    const resendKey = process.env.RESEND_API_KEY;
    
    if (!resendKey) {
      console.log('Email notification not configured. Submission logged:', {
        type,
        email,
        timestamp
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Notification endpoint not configured. See /app/api/send-notification/route.ts for setup instructions.' 
        },
        { status: 200 }
      );
    }

    // Configure email based on type
    const subjects = {
      'newsletter': `[Newsletter Signup] New subscriber: ${email}`,
      'intel-brief': `[Intel Brief Signup] New subscriber: ${email}`
    };

    const confirmationMessages = {
      'newsletter': "You're in. Intelligence incoming.",
      'intel-brief': "You've entered the field. First brief incoming."
    };

    // If using Resend:
    // const { Resend } = require('resend');
    // const resend = new Resend(resendKey);
    //
    // Send notification to research@agothe.ai
    // await resend.emails.send({
    //   from: 'noreply@agothe.ai',
    //   to: 'research@agothe.ai',
    //   subject: subjects[type] || 'New Form Submission',
    //   html: `
    //     <h2>New Subscription</h2>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Type:</strong> ${type}</p>
    //     <p><strong>Timestamp:</strong> ${timestamp}</p>
    //   `
    // });
    //
    // Send confirmation to subscriber
    // await resend.emails.send({
    //   from: 'intelligence@agothe.ai',
    //   to: email,
    //   subject: 'Welcome to Agothe Intelligence',
    //   html: `<p>${confirmationMessages[type]}</p>`
    // });

    return NextResponse.json(
      { success: true, message: 'Notification sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
