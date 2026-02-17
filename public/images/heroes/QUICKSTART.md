# Quick Start: Add Landing Page Hero Image

## The Simplest Way to Add Images

Want to add or change the hero image on the landing page? Here's all you need to do:

### Step 1: Prepare Your Image
- Format: `.webp` (recommended) or `.png`/`.jpg`
- Dimensions: 1920x1080 or higher
- Content: Should look good on dark backgrounds
- File name: **Exactly** `landing-substrate.webp`

### Step 2: Drop It Here
- Copy/move your image to this directory: `/public/images/heroes/`
- Make sure the filename is exactly: `landing-substrate.webp`

### Step 3: Refresh
- Open your browser to `http://localhost:3000/` (dev) or your live site
- Hard refresh (Ctrl+Shift+R on Windows/Linux, Cmd+Shift+R on Mac)
- Your image appears automatically with a dark gradient overlay!

## That's It!

No code changes needed. No configuration files to edit. Just drop the file and refresh.

## Example Workflow

```bash
# 1. You have your image ready
my-awesome-hero-image.webp

# 2. Rename it (or save as)
landing-substrate.webp

# 3. Drop it into this directory
/public/images/heroes/landing-substrate.webp

# 4. Start dev server (if not running)
npm run dev

# 5. Open browser
http://localhost:3000/

# Done! Your image is now the hero background
```

## What Happens Automatically

When you drop the image, the system automatically:
- ✅ Loads it with priority (fast loading)
- ✅ Adds a dark gradient overlay for text readability
- ✅ Falls back to a dark placeholder if image fails
- ✅ Optimizes it for WebP format
- ✅ Makes it responsive (works on all screen sizes)

## Troubleshooting

### Image doesn't show?
- **Check filename**: Must be exactly `landing-substrate.webp` (lowercase, no spaces)
- **Check location**: Must be in `/public/images/heroes/` directory
- **Hard refresh**: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- **Check console**: Open browser DevTools (F12) and check for errors

### Image looks wrong?
- **Too bright**: The dark gradient overlay will dim it automatically
- **Wrong size**: System will scale it, but 1920x1080+ recommended
- **Wrong format**: Convert to WebP for best results (PNG/JPEG work too)

## Need Help?

- See full documentation: [IMAGES.md](../../../IMAGES.md)
- See all hero images: [README.md](./README.md)
- Contact: research@agothe.ai
