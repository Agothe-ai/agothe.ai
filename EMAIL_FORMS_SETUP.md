# Email Form Setup Guide

This document provides step-by-step instructions for configuring email forms and notifications for agothe.ai.

## Overview

Two email signup forms have been implemented:

1. **Newsletter Signup** (Top of Homepage) - In hero section
2. **Intelligence Brief Signup** (Bottom of Homepage) - Section ID: `#intel-brief-signup`

Both forms:
- Store email addresses in Supabase `newsletter_subscribers` table
- Track source (homepage-top or homepage-bottom)
- Display custom success messages
- Can trigger email notifications to research@agothe.ai

## Database Setup

### 1. Apply Migration

Run the migration to add source tracking:

```bash
# If using Supabase CLI
supabase db push

# Or apply manually in Supabase dashboard SQL editor:
# /supabase/migrations/20260217000000_add_source_to_newsletter.sql
```

### 2. Verify Table Schema

The `newsletter_subscribers` table should have:
- `id` (uuid, primary key)
- `email` (text, unique)
- `source` (text) - tracks "homepage-top" or "homepage-bottom"
- `created_at` (timestamp)

## Email Notification Setup

Choose one of these options to enable email forwarding to research@agothe.ai:

### Option 1: Resend (Recommended)

Resend provides a simple API for transactional emails with excellent deliverability.

**Steps:**

1. Sign up at https://resend.com (free tier: 3,000 emails/month)

2. Verify your domain:
   - Add DNS records for `agothe.ai`
   - Or use `onboarding@resend.dev` for testing

3. Get your API key from Settings → API Keys

4. Install Resend SDK:
   ```bash
   npm install resend
   ```

5. Add to environment variables (Netlify dashboard or `.env.local`):
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

6. Uncomment the Resend code in `/app/api/send-notification/route.ts`:
   ```typescript
   const { Resend } = require('resend');
   const resend = new Resend(resendKey);
   
   // Send notification to research@agothe.ai
   await resend.emails.send({
     from: 'noreply@agothe.ai',
     to: 'research@agothe.ai',
     subject: subjects[type] || 'New Form Submission',
     html: `
       <h2>New Subscription</h2>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Type:</strong> ${type}</p>
       <p><strong>Timestamp:</strong> ${timestamp}</p>
     `
   });
   
   // Send confirmation to subscriber
   await resend.emails.send({
     from: 'intelligence@agothe.ai',
     to: email,
     subject: 'Welcome to Agothe Intelligence',
     html: `<p>${confirmationMessages[type]}</p>`
   });
   ```

### Option 2: SendGrid

1. Sign up at https://sendgrid.com

2. Create an API key with Mail Send permissions

3. Install SendGrid SDK:
   ```bash
   npm install @sendgrid/mail
   ```

4. Add to environment variables:
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ```

5. Update `/app/api/send-notification/route.ts`:
   ```typescript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   await sgMail.send({
     to: 'research@agothe.ai',
     from: 'noreply@agothe.ai',
     subject: subjects[type],
     html: '...'
   });
   ```

### Option 3: Zapier/Make Integration

If you prefer no-code automation:

1. **Export Data to Google Sheets**
   - Set up Supabase Database Webhooks
   - Or use a scheduled function to sync data periodically

2. **Create Zapier Zap:**
   - Trigger: Google Sheets "New Row"
   - Action 1: Gmail "Send Email" to research@agothe.ai
   - Action 2: Gmail "Send Email" to subscriber email

3. **Or use Make.com** (similar workflow)

## Scroll Behavior

All three "Commission a Report" buttons in the pricing section now scroll to `#intel-brief-signup`:

- Research Synthesis tier ($500) → Scrolls to bottom form
- CAPS Intelligence tier ($2,500) → Scrolls to bottom form
- Enterprise Monitoring tier (Custom) → Scrolls to bottom form

Smooth scrolling is enabled in `/app/globals.css`.

## Testing Checklist

### Form 1 - Newsletter Signup (Hero)

- [ ] Navigate to homepage
- [ ] Enter email in hero section form
- [ ] Click "Get Updates"
- [ ] Verify success message: "You're in. Intelligence incoming."
- [ ] Check Supabase table for entry with `source: "homepage-top"`
- [ ] Verify notification email sent to research@agothe.ai (if configured)
- [ ] Verify confirmation email sent to subscriber (if configured)

### Form 2 - Intelligence Brief Signup (Bottom)

- [ ] Scroll to bottom of homepage
- [ ] Verify section has ID `intel-brief-signup`
- [ ] Enter email in form
- [ ] Click "Join"
- [ ] Verify success message: "You've entered the field. First brief incoming."
- [ ] Check Supabase table for entry with `source: "homepage-bottom"`
- [ ] Verify notification email sent to research@agothe.ai (if configured)

### Button Scroll Behavior

- [ ] Click "Commission Report" on Research Synthesis tier
- [ ] Verify smooth scroll to bottom form
- [ ] Click "Get Started" on CAPS Intelligence tier
- [ ] Verify smooth scroll to bottom form
- [ ] Click "Contact Us" on Enterprise Monitoring tier
- [ ] Verify smooth scroll to bottom form

### Email Notifications (if enabled)

- [ ] Submit test form
- [ ] Check research@agothe.ai inbox for notification
- [ ] Verify subject line matches: `[Newsletter Signup] New subscriber: {email}` or `[Intel Brief Signup] New subscriber: {email}`
- [ ] Check subscriber email for confirmation
- [ ] Verify confirmation message is correct

## Google Sheets Export (Optional)

If you want to automatically export subscribers to Google Sheets:

1. **Using Supabase Function:**
   ```typescript
   // Create edge function that runs on schedule
   // Exports newsletter_subscribers to Google Sheets API
   ```

2. **Using Zapier:**
   - Trigger: Supabase "New Row"
   - Action: Google Sheets "Create Spreadsheet Row"
   - Map columns: Email, Timestamp, Source

3. **Manual Export:**
   ```sql
   -- Run in Supabase SQL editor
   SELECT email, source, created_at 
   FROM newsletter_subscribers 
   ORDER BY created_at DESC;
   ```
   Copy results to Google Sheets.

## Environment Variables Reference

Add these to Netlify dashboard (Site Settings → Environment Variables):

```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Site URL (optional, defaults to https://agothe.ai)
NEXT_PUBLIC_SITE_URL=https://agothe.ai

# Email Service (choose one)
RESEND_API_KEY=re_your_key_here
# OR
SENDGRID_API_KEY=SG.your_key_here
```

## API Endpoints

### POST /api/newsletter

Handles newsletter submissions.

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage-top" | "homepage-bottom"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription successful",
  "id": "uuid"
}
```

### POST /api/send-notification

Sends notification emails (internal use).

**Request:**
```json
{
  "type": "newsletter" | "intel-brief",
  "email": "user@example.com",
  "timestamp": "2026-02-17T23:30:00.000Z"
}
```

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify Supabase environment variables are set
- Check Supabase table permissions (RLS policies)

### Emails not sending
- Verify API key is set in environment variables
- Check Netlify function logs for errors
- Test with a simple curl request to `/api/send-notification`
- Verify domain is verified in email service provider

### Scroll not working
- Ensure `#intel-brief-signup` ID exists on EmailCapture section
- Check browser console for JavaScript errors
- Verify smooth scrolling is enabled in globals.css

## Next Steps

1. Apply database migration
2. Choose and configure email service (Resend recommended)
3. Add environment variables to Netlify
4. Deploy and test both forms
5. Verify emails are received at research@agothe.ai
6. Set up Google Sheets export (optional)

## Support

For issues or questions:
- Check Supabase logs for database errors
- Check Netlify function logs for API errors
- Review browser console for client-side errors
