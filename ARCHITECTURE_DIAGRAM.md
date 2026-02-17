# Email Forms - Visual Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        HOMEPAGE (/)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    HERO SECTION                           │   │
│  │                                                            │   │
│  │  "Predict collapse. Navigate emergence. Build coherence." │   │
│  │                                                            │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │  FORM 1: Newsletter Signup                        │    │   │
│  │  │  ┌─────────────────┐  ┌──────────────┐          │    │   │
│  │  │  │ your@email.com  │  │ Get Updates  │          │    │   │
│  │  │  └─────────────────┘  └──────────────┘          │    │   │
│  │  │                                                   │    │   │
│  │  │  Source: "homepage-top"                          │    │   │
│  │  │  Success: "You're in. Intelligence incoming."    │    │   │
│  │  └──────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ... [Other Sections] ...                                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  PRICING SECTION                          │   │
│  │                                                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │   │
│  │  │  Research   │  │    CAPS     │  │ Enterprise  │      │   │
│  │  │  Synthesis  │  │ Intelligence│  │ Monitoring  │      │   │
│  │  │   $500      │  │   $2,500    │  │   Custom    │      │   │
│  │  │             │  │             │  │             │      │   │
│  │  │  [Button] ──┼──┼─> [Button] ─┼──┼─> [Button]  │      │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │   │
│  │         │                 │                 │             │   │
│  │         └─────────────────┴─────────────────┘             │   │
│  │                           │                                │   │
│  │                  All scroll down to ↓                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  FORM 2: Intelligence Brief Signup                        │   │
│  │  (ID: #intel-brief-signup) ← Scroll Target               │   │
│  │                                                            │   │
│  │  "Enter the field."                                       │   │
│  │  "Get weekly intelligence briefs..."                      │   │
│  │                                                            │   │
│  │  ┌─────────────────┐  ┌──────────────┐                  │   │
│  │  │ your@email.com  │  │     Join     │                  │   │
│  │  └─────────────────┘  └──────────────┘                  │   │
│  │                                                            │   │
│  │  Source: "homepage-bottom"                                │   │
│  │  Success: "You've entered the field. First brief..."     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════
                        BACKEND FLOW
═══════════════════════════════════════════════════════════════════

┌──────────────┐
│ User submits │
│    email     │
└──────┬───────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  POST /api/newsletter                     │
│                                           │
│  {                                        │
│    email: "user@example.com",            │
│    source: "homepage-top" | "homepage-   │
│             bottom"                       │
│  }                                        │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Validate Email Format                    │
│  (Regex check + type check)              │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Insert into Supabase                     │
│                                           │
│  newsletter_subscribers                   │
│  ├─ email (unique)                        │
│  ├─ source                                │
│  └─ created_at (auto)                     │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Trigger Notification (Async)            │
│  POST /api/send-notification             │
│                                           │
│  Don't wait - return success immediately │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Return Success Response                  │
│                                           │
│  {                                        │
│    success: true,                        │
│    message: "Subscription successful",   │
│    id: "uuid"                            │
│  }                                        │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Display Success Message                  │
│                                           │
│  Form 1: "You're in. Intelligence..."    │
│  Form 2: "You've entered the field..."   │
└───────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
              EMAIL NOTIFICATION FLOW (OPTIONAL)
═══════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────┐
│  POST /api/send-notification             │
│                                           │
│  {                                        │
│    type: "newsletter" | "intel-brief",   │
│    email: "user@example.com",            │
│    timestamp: "2026-02-17..."            │
│  }                                        │
└──────┬───────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────┐
│  Check for API Key                        │
│  (RESEND_API_KEY or SENDGRID_API_KEY)   │
└──────┬───────────────────────────────────┘
       │
       ├─────────────┬─────────────┐
       │             │             │
   NO API KEY    HAS API KEY       │
       │             │             │
       ↓             ↓             │
┌─────────┐   ┌──────────────┐    │
│  Log to │   │ Send Email 1 │    │
│ Console │   │              │    │
│         │   │ To: research@│    │
│ Continue│   │  agothe.ai   │    │
└─────────┘   │              │    │
              │ Subject:     │    │
              │ [Newsletter  │    │
              │ Signup] or   │    │
              │ [Intel Brief]│    │
              └──────┬───────┘    │
                     │             │
                     ↓             │
              ┌──────────────┐    │
              │ Send Email 2 │    │
              │              │    │
              │ To: subscriber│   │
              │              │    │
              │ Message:     │    │
              │ "You're in..." │  │
              │ or "You've   │    │
              │ entered..."  │    │
              └──────────────┘    │
                     │             │
                     └─────────────┘
                           │
                           ↓
                    ┌──────────────┐
                    │   Complete   │
                    └──────────────┘


═══════════════════════════════════════════════════════════════════
                      DATABASE SCHEMA
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│  Table: newsletter_subscribers                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┬──────────────┬─────────────┬────────────────┐ │
│  │ id          │ email        │ source      │ created_at     │ │
│  │ (uuid)      │ (text)       │ (text)      │ (timestamp)    │ │
│  ├─────────────┼──────────────┼─────────────┼────────────────┤ │
│  │ PRIMARY KEY │ UNIQUE       │ NOT NULL    │ DEFAULT now()  │ │
│  └─────────────┴──────────────┴─────────────┴────────────────┘ │
│                                                                  │
│  Example Data:                                                   │
│  ┌──────────┬───────────────┬──────────────┬──────────────┐    │
│  │ uuid-1   │ user@test.com │ homepage-top │ 2026-02-17...│    │
│  │ uuid-2   │ jane@test.com │ homepage-    │ 2026-02-17...│    │
│  │          │               │ bottom       │              │    │
│  └──────────┴───────────────┴──────────────┴──────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════
                    FILE STRUCTURE
═══════════════════════════════════════════════════════════════════

app/
├── api/
│   ├── newsletter/
│   │   └── route.ts ──────────► Form submission handler
│   └── send-notification/
│       └── route.ts ──────────► Email sender (optional)
└── page.tsx (modified)

components/
└── agothe/
    ├── hero.tsx ──────────────► Added NewsletterSignup
    ├── newsletter-signup.tsx ► NEW: Hero form component
    ├── email-capture.tsx ─────► Updated: Added ID anchor
    └── pricing-section.tsx ───► Updated: Scroll links

supabase/
└── migrations/
    └── 20260217000000_add_source_to_newsletter.sql ► Migration

Documentation/
├── README_EMAIL_FORMS.md ─────────► Main overview
├── EMAIL_FORMS_SETUP.md ──────────► Complete setup guide
├── QUICK_START_EMAIL.md ──────────► 5-min Resend setup
└── EMAIL_FORMS_IMPLEMENTATION.md ► Technical details


═══════════════════════════════════════════════════════════════════
                    DEPLOYMENT CHECKLIST
═══════════════════════════════════════════════════════════════════

Before Deployment:
☐ Review all code changes
☐ Test forms locally (optional)
☐ Verify Supabase connection

On Deployment:
☐ Apply database migration in Supabase
☐ Add RESEND_API_KEY to Netlify (optional)
☐ Deploy to production

After Deployment:
☐ Test Form 1 (hero)
☐ Test Form 2 (bottom)
☐ Test all 3 pricing buttons
☐ Verify database entries
☐ Check email notifications (if enabled)

═══════════════════════════════════════════════════════════════════
```
