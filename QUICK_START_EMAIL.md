# Quick Start: Email Notifications

## 🚀 5-Minute Setup with Resend

### Step 1: Get API Key
1. Go to https://resend.com and sign up
2. Click "API Keys" → "Create API Key"
3. Copy the key (starts with `re_`)

### Step 2: Install Package
```bash
npm install resend
```

### Step 3: Add Environment Variable
In Netlify dashboard:
- Go to Site Settings → Environment Variables
- Add: `RESEND_API_KEY` = `re_your_key_here`

### Step 4: Verify Domain (Important!)
In Resend dashboard:
- Go to Domains → Add Domain
- Add DNS records for `agothe.ai`:
  ```
  Type: TXT
  Name: @
  Value: [value from Resend]
  
  Type: CNAME  
  Name: resend._domainkey
  Value: [value from Resend]
  ```

### Step 5: Activate Code
Edit `/app/api/send-notification/route.ts`:

**Find line 28** (around there):
```typescript
if (!resendKey) {
  console.log('Email notification not configured...');
```

**Add this code BEFORE that if statement:**
```typescript
// Uncomment this block to enable Resend
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

### Step 6: Deploy
```bash
git add .
git commit -m "Enable email notifications via Resend"
git push
```

Netlify will auto-deploy. Done! 🎉

## ⚡ Test It

1. Go to your site
2. Enter your email in the hero form
3. Check research@agothe.ai inbox
4. Check your email for confirmation

## 📊 Monitor Usage

Resend dashboard shows:
- Emails sent today
- Delivery status
- Bounce/spam reports

Free tier: 3,000 emails/month (way more than you need)

## 🔧 Alternative: Use for Testing Only

For testing without domain verification:
- Use `from: 'onboarding@resend.dev'` instead
- This works instantly but says "via Resend"
- Good for testing, not production

## ❓ Troubleshooting

**"Domain not verified"**
→ Check DNS records in your domain registrar

**"API key invalid"**
→ Copy key again from Resend, paste in Netlify

**"No emails received"**
→ Check Resend logs for delivery status
→ Check spam folder

**"Function timeout"**
→ Increase Netlify function timeout in netlify.toml

## 📧 Email Subject Lines

Newsletter (top form):
```
[Newsletter Signup] New subscriber: user@example.com
```

Intel Brief (bottom form):
```
[Intel Brief Signup] New subscriber: user@example.com
```

## ✉️ Confirmation Messages

Newsletter:
> You're in. Intelligence incoming.

Intel Brief:
> You've entered the field. First brief incoming.

---

**That's it!** Full email notifications in 5 minutes.

For detailed instructions, see `EMAIL_FORMS_SETUP.md`
