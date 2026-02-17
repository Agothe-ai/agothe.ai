# Hero Images Mapping

This document shows which hero images are displayed on each page of the Agothe.ai website.

## Status: ✅ All Pages Updated

All pages across the website now display hero images. Pages with missing specific hero images use fallback images until the specific images are provided.

## Hero Images by Page

### Main Pages

| Page | Hero Image File | Status |
|------|----------------|--------|
| `/` (Home) | `landing-substrate.webp` | ✅ Present |
| `/about` | `about-origin-seed.webp` | ✅ Present |
| `/contact` | `contact-open-hand.webp` | ✅ Present |
| `/pricing` | `pricing-three-intensities.webp` | ✅ Present |
| `/media` | `media-prism-organism.webp` | ✅ Present |

### Service Pages

| Page | Hero Image File | Status |
|------|----------------|--------|
| `/research` | `research-synthesis-lattice.webp` | ✅ Present |
| `/solvey` | `solvey-seismograph.webp` | ✅ Present |
| `/propaganda` | `propaganda-filter.webp` | ✅ Present |
| `/couture` | `couture-chrysalis-unfurling.webp` | ✅ Present |
| `/intelligence` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - `intelligence-eye-of-caps.webp` missing |
| `/framework` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - `framework-architecture-organism.webp` missing |
| `/demo` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - `demo-interface-tendril.webp` missing |
| `/automation` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - needs specific image |
| `/simulation` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - needs specific image |

### Content Pages

| Page | Hero Image File | Status |
|------|----------------|--------|
| `/case-studies` | `case-studies-specimen-jars.webp` | ✅ Present |
| `/transmissions` | `transmissions-signal.webp` | ✅ Present |
| `/docs` | `about-origin-seed.webp` (fallback) | ⚠️ Using fallback - `docs-archive-coral.webp` missing |
| `/os` | `os-52-engine-cluster.webp` | ✅ Present |

### Vision Pages (Using Custom Hero Components)

These pages use custom hero components (CityParallax, VREnvironmentMorph, etc.) and don't need static hero images:

- `/city` - Uses CityParallax component
- `/vr` - Uses VREnvironmentMorph component  
- `/institutes` - Uses default gradient

## Missing Hero Images

The following hero images are referenced in the README but not present in `/public/images/heroes/`:

1. `intelligence-eye-of-caps.webp` - For `/intelligence` page
2. `framework-architecture-organism.webp` - For `/framework` page
3. `demo-interface-tendril.webp` - For `/demo` page
4. `docs-archive-coral.webp` - For `/docs` page

**Action Required:** Upload these images to `/public/images/heroes/` to replace the fallback images.

## Implementation Details

### Components Created

1. **PageHero Component** (`components/agothe/page-hero.tsx`)
   - Reusable hero section component
   - Uses SmartImage with automatic fallback handling
   - Includes dark gradient overlay for text readability
   - Priority loading for above-fold performance

2. **ServicePage Template Updates** (`components/agothe/service-page-template.tsx`)
   - Added `heroImage` and `heroImageAlt` props
   - Integrates PageHero component when hero image is provided
   - Falls back to MeshGradientHero or ChromeHeroOverlay when no image

### Pages Updated

**Content Pages (8 files):**
- `app/about/content.tsx`
- `app/contact/content.tsx`
- `app/pricing/content.tsx`
- `app/media/content.tsx`
- `app/case-studies/content.tsx`
- `app/transmissions/content.tsx`
- `app/docs/content.tsx`
- `app/os/content.tsx`

**Service Pages (9 files):**
- `app/research/page.tsx`
- `app/solvey/page.tsx`
- `app/propaganda/page.tsx`
- `app/couture/page.tsx`
- `app/intelligence/page.tsx`
- `app/framework/page.tsx`
- `app/demo/page.tsx`
- `app/automation/page.tsx`
- `app/simulation/page.tsx`

## Next Steps

To complete the hero image integration:

1. **Upload Missing Images:** Add the 4 missing hero images to `/public/images/heroes/`
2. **Update Fallbacks:** Once images are uploaded, they will automatically be displayed (no code changes needed)
3. **Optional:** Create specific hero images for `/automation` and `/simulation` pages

## Testing

✅ Build successful - no errors
✅ All pages render correctly
✅ Fallback mechanism working for missing images
✅ Dark gradient overlay displays properly for text readability

## Notes

- All hero images use `priority={true}` for above-fold loading performance
- Images use `sizes="100vw"` for proper responsive behavior
- SmartImage component automatically handles missing images with fallback
- The `/` (home) page already had hero image integration via the Hero component
