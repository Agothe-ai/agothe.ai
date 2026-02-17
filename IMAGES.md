# Image Drop-and-Appear Workflow

This guide explains how to add images to the Agothe.ai website using a simple **drop-and-appear** workflow. No code changes required!

## Quick Start

1. **Find the right directory** in `/public/images/`
2. **Name your file correctly** (see naming guide below)
3. **Drop the file** into the directory
4. **Refresh the page** — your image appears automatically!

## Directory Structure

```
/public/images/
├── heroes/           # Page hero images (top of each page)
├── sections/         # In-page section images (below the fold)
├── backgrounds/      # Decorative background textures
├── icons/            # Entity icons (64x64px)
├── video/            # Video backgrounds
└── utility/          # Fallbacks & placeholders
```

## Hero Images (Landing Page & Other Pages)

Hero images appear at the top of each page with a dark gradient overlay.

### Landing Page Hero

**File**: `/public/images/heroes/landing-substrate.webp`

This is the main hero image for the homepage (`/`). Simply drop a file named `landing-substrate.webp` into the `/public/images/heroes/` directory and it will appear automatically as the background on the landing page.

### Other Page Heroes

Each page has a designated hero image filename:

| Page | Filename | Location |
|------|----------|----------|
| Homepage `/` | `landing-substrate.webp` | `/public/images/heroes/` |
| About `/about` | `about-origin-seed.webp` | `/public/images/heroes/` |
| Intelligence `/intelligence` | `intelligence-eye-of-caps.webp` | `/public/images/heroes/` |
| Research `/research` | `research-synthesis-lattice.webp` | `/public/images/heroes/` |
| Solvey `/solvey` | `solvey-seismograph.webp` | `/public/images/heroes/` |
| Framework `/framework` | `framework-architecture-organism.webp` | `/public/images/heroes/` |
| Propaganda `/propaganda` | `propaganda-filter.webp` | `/public/images/heroes/` |
| Couture `/couture` | `couture-chrysalis-unfurling.webp` | `/public/images/heroes/` |
| Pricing `/pricing` | `pricing-three-intensities.webp` | `/public/images/heroes/` |
| Demo `/demo` | `demo-interface-tendril.webp` | `/public/images/heroes/` |
| OS `/os` | `os-52-engine-cluster.webp` | `/public/images/heroes/` |
| Transmissions `/transmissions` | `transmissions-signal.webp` | `/public/images/heroes/` |
| Docs `/docs` | `docs-archive-coral.webp` | `/public/images/heroes/` |
| Contact `/contact` | `contact-open-hand.webp` | `/public/images/heroes/` |
| Media `/media` | `media-prism-organism.webp` | `/public/images/heroes/` |
| Case Studies `/case-studies` | `case-studies-specimen-jars.webp` | `/public/images/heroes/` |

## Section Images (In-Page Content)

Section images appear within page content, below the hero area.

**Directory**: `/public/images/sections/`

To add a section image:
1. Save your image as `.webp` format
2. Give it a descriptive name (e.g., `demo-interface.webp`, `problem-comparison.webp`)
3. Drop it into `/public/images/sections/`
4. Reference it in the component with: `<SmartImage src="/images/sections/your-image.webp" ... />`

## Image Guidelines

### Format
- **Preferred**: WebP format (`.webp`) for optimal performance
- **Fallback**: PNG (`.png`) or JPEG (`.jpg`) also work

### Dimensions
- **Hero images**: 1920x1080 or higher
- **Section images**: Varies by use case (typically 800-1600px wide)
- **Icons**: 64x64px

### Dark Theme Compliance
- All images should work well on dark backgrounds (`#0a0a0a`)
- The system automatically adds dark gradient overlays to hero images
- Avoid images with white backgrounds (against design invariants)

### File Naming
- Use kebab-case: `my-image-name.webp`
- Be descriptive: `landing-substrate.webp` not `hero1.webp`
- Match the exact filename from the tables above for hero images

## How It Works (Technical)

All images are rendered through smart components with automatic fallback handling:

### SmartImage Component
- Automatically falls back to `/images/utility/fallback-dark.svg` if image is missing
- Handles errors gracefully
- Optimizes loading (hero images use `priority={true}`)

### Hero Image System
- Hero images load with dark gradient overlay
- Z-index layers: void (bg) → image → overlay → content
- Priority loading for above-the-fold performance

### Example Code (for reference)
```tsx
{/* Hero background with automatic fallback */}
<div className="absolute inset-0 z-0">
  <SmartImage
    src="/images/heroes/landing-substrate.webp"
    alt="Hero image description"
    fill
    priority={true}
    sizes="100vw"
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-agothe-bg/60 via-agothe-bg/80 to-agothe-bg" />
</div>
```

## Troubleshooting

### Image doesn't appear
1. **Check the filename** — Must match exactly (case-sensitive)
2. **Check the directory** — Must be in the correct `/public/images/` subdirectory
3. **Check the format** — WebP is preferred, but PNG/JPEG work too
4. **Clear cache** — Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
5. **Check file permissions** — Ensure the file is readable

### Image appears but looks wrong
1. **Dimensions** — Hero images should be 1920x1080 or higher
2. **Dark theme** — Ensure image works on dark backgrounds
3. **Overlay** — Hero images automatically get a dark gradient overlay

### Fallback image appears instead
- The image file is missing or has the wrong filename
- Check the exact filename matches what's expected
- Verify the file is in the correct directory

## Examples

### Example 1: Add Landing Page Hero
```bash
# Navigate to heroes directory
cd /public/images/heroes/

# Drop your image with the exact name
# File: landing-substrate.webp

# That's it! Refresh homepage and it appears
```

### Example 2: Add Section Image
```bash
# Navigate to sections directory
cd /public/images/sections/

# Drop your image with any descriptive name
# File: demo-screenshot.webp

# Then reference it in your component:
# <SmartImage src="/images/sections/demo-screenshot.webp" ... />
```

### Example 3: Replace Existing Hero
```bash
# Simply overwrite the existing file
# File: /public/images/heroes/landing-substrate.webp

# The new image appears on next page load
```

## Design System Compliance

All images must follow Agothe.ai design invariants:

✅ **DO:**
- Use dark backgrounds (`#0a0a0a` - void black)
- Use WebP format for optimal performance
- Use SmartImage component for all image rendering
- Test images on dark backgrounds before deploying

❌ **DON'T:**
- Use white backgrounds anywhere
- Use raw `<img>` tags (always use SmartImage)
- Skip the fallback system
- Use light theme images

## Performance Notes

- Hero images load with `priority={true}` for instant display
- Section images lazy load by default (below the fold)
- WebP format is automatically optimized by Next.js
- SmartImage handles errors gracefully with fallback
- All images include `alt` text for accessibility

---

**Questions?** Check the README files in each `/public/images/` subdirectory for more specific guidance.
