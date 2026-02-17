# Hero Images

**DROP-AND-APPEAR WORKFLOW**: Drop a `.webp` file into this directory with the correct filename, refresh the page, and it appears automatically!

## Quick Reference

### Landing Page (Most Important!)
- **File**: `landing-substrate.webp`
- **Page**: Homepage `/`
- **Just drop it here and refresh!**

## All Hero Images

Drop 16 hero images (.webp format) into this directory. These images appear at the top of each page with priority loading.

## Required Files:

1. `landing-substrate.webp` → Homepage `/`
2. `about-origin-seed.webp` → `/about`
3. `intelligence-eye-of-caps.webp` → `/intelligence`
4. `research-synthesis-lattice.webp` → `/research`
5. `solvey-seismograph.webp` → `/solvey`
6. `framework-architecture-organism.webp` → `/framework`
7. `propaganda-filter.webp` → `/propaganda`
8. `couture-chrysalis-unfurling.webp` → `/couture`
9. `pricing-three-intensities.webp` → `/pricing`
10. `demo-interface-tendril.webp` → `/demo`
11. `os-52-engine-cluster.webp` → `/os`
12. `transmissions-signal.webp` → `/transmissions`
13. `docs-archive-coral.webp` → `/docs`
14. `contact-open-hand.webp` → `/contact`
15. `media-prism-organism.webp` → `/media`
16. `case-studies-specimen-jars.webp` → `/case-studies`

## Guidelines:
- Format: WebP
- Recommended dimensions: 1920x1080 or higher
- Will be used with dark gradient overlays
- Loaded with priority={true} for above-fold performance
- Fallback: `/images/utility/fallback-dark.svg` if missing

## Example: Add Landing Page Hero

```bash
# 1. Get your image ready (1920x1080 WebP)
# 2. Name it exactly: landing-substrate.webp
# 3. Drop it into this directory
# 4. Refresh homepage at http://localhost:3000/
# 5. Done! Image appears with dark gradient overlay
```

## Troubleshooting

**Image doesn't show?**
- Check filename matches exactly (case-sensitive)
- Ensure it's `.webp` format
- Hard refresh browser (Ctrl+Shift+R)

**Want full documentation?**
See [IMAGES.md](../../IMAGES.md) in the root directory.
