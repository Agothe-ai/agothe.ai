# AGOTHE.AI — DESIGN INVARIANTS

This file defines non-negotiable design rules for the Agothe.ai platform. All code changes must preserve these invariants.

## COLOR PALETTE (V1 Dark Tokens)

```
void/bg:    #0a0a0a  (primary background)
teal:       #00f0ff  (primary accent, links, borders)
gold:       #ffd700  (secondary accent, highlights)
danger:     #ef4444  (errors, warnings)
white:      #ffffff  (primary text)
muted:      #64748b  (secondary text)
navy:       #0a1628  (glass backgrounds)
```

**NEVER** use white (`#ffffff` or `#fff`) as a background color.
**NEVER** use light grays, blues, or chrome-style colors as backgrounds.

## DESIGN SYSTEM RULES

1. **Dark-Only Theme**
   - Background: `#0a0a0a` (void black) everywhere
   - No light theme, no light mode, no white backgrounds
   - All text on dark backgrounds, never dark text on light backgrounds

2. **Glass Morphism (Obsidian Glass)**
   - Cards use `.obsidian-glass` class
   - Dark glass: `rgba(10, 22, 40, 0.85)` with blur
   - Hover state adds teal border glow
   - Includes subtle noise texture overlay

3. **Typography**
   - Headings: Space Grotesk (loaded via Google Fonts)
   - Body: Inter (loaded via Google Fonts)
   - Mono: JetBrains Mono (loaded via Google Fonts)
   - All fonts must be loaded in layout.tsx

4. **Navigation**
   - Dark fogged glass panel: `rgba(10, 22, 40, 0.85)`
   - NOT white/chrome
   - Teal accents on hover
   - Fixed position with backdrop blur

5. **Footer**
   - Background: `#050505` (near-black)
   - CAPS ticker with teal monospace text
   - All links and text in teal or muted colors

## COMPONENT ARCHITECTURE

### Required Global Components

- **SmartImage**: Image component with `onError` fallback to prevent broken images
- **EntityIcon**: Icon component with 3 sizes (sm/md/lg) and teal circle fallback
- **CosmicDivider**: Section divider with subtle cosmic gradient
- **VideoBackground**: Video player with static image fallback
- **ObsidianCard**: Dark glass card wrapper (already exists)

### Couture Data Pipeline

- All couture content lives in `lib/couture-data.ts`
- 8 couture blocks import from this file
- Empty arrays render placeholder states, not blank/broken views
- Transformation phases: 4 phases with δ_H values
- Chronica directors: 5 directors with titles and quotes

## IMAGE SYSTEM

### Directory Structure

```
/public/images/
  heroes/           (page hero images)
  icons/            (entity icons)
  sections/         (in-page section images)
  backgrounds/      (decorative backgrounds)
  utility/          (fallbacks, placeholders)
  chronica/         (Chronica-specific assets)
  couture/          (8 subdirectories)
    hero/
    editorial/
    lookbook/
    collection/
    textures/
    transformation/
    directors/
    seeds/
  video/            (video backgrounds)
```

### Image Rules

1. **Every image uses SmartImage or EntityIcon** — no raw `<img>` tags
2. **Hero images**:
   - Use `<SmartImage priority={true} />`
   - Include dark gradient overlay
   - Z-index: void → image → overlay → content
3. **Below-fold images**:
   - No `priority` prop
   - Lazy load by default
4. **File drop = live**:
   - Dropping a file at the right path with right name makes it appear
   - No extra code needed except for couture (needs data entry)

## WEBGL & PERFORMANCE

### Silent WebGL Kill

The following WebGL components must be **neutralized** (return null or removed):

- `components/motion/spatial-backdrop.tsx` — spatial corridor backdrop
- `components/motion/mesh-gradient-hero.tsx` — mesh gradient WebGL
- `components/motion/chrome-liquid-metal.tsx` — liquid metal effects

These should either:
- Return `null` unconditionally, OR
- Be removed from all page imports

### Performance Requirements

- Zero below-fold images have `priority={true}`
- All `<Image>` components have explicit `sizes` prop
- No image renders without dimensions (prevents CLS)
- `next.config.js` has `formats: ['image/webp']`
- No `loading="eager"` outside of hero slots

## PLATFORM CONFIGURATION

- **Deployment**: Netlify only (never Vercel)
- **Next.js**: Version 13.x (App Router)
- **Netlify Config**: `netlify.toml` with `@netlify/plugin-nextjs`
- No Vercel-specific APIs or conventions

## CONTENT RULES

1. **Real copy, not lorem ipsum**
   - Search Notion or handoff docs for actual content
   - If unavailable, use service-specific placeholder that fits the tone

2. **Hero image manifest** (all use SmartImage):
   - `/` → `landing-substrate.webp`
   - `/about` → `about-origin-seed.webp`
   - `/intelligence` → `intelligence-eye-of-caps.webp`
   - `/research` → `research-synthesis-lattice.webp`
   - `/solvey` → `solvey-seismograph.webp`
   - `/framework` → `framework-architecture-organism.webp`
   - `/propaganda` → `propaganda-filter.webp`
   - `/couture` → `couture-chrysalis-unfurling.webp`
   - `/pricing` → `pricing-three-intensities.webp`
   - `/demo` → `demo-interface-tendril.webp`
   - `/os` → `os-52-engine-cluster.webp`
   - `/transmissions` → `transmissions-signal.webp`
   - `/docs` → `docs-archive-coral.webp`
   - `/contact` → `contact-open-hand.webp`
   - `/media` → `media-prism-organism.webp`
   - `/case-studies` → `case-studies-specimen-jars.webp`

## VIOLATION PREVENTION

**DO NOT:**
- Add light theme support or light mode toggles
- Use white backgrounds anywhere in the design
- Skip SmartImage/EntityIcon — images MUST have fallbacks
- Hard-code image paths without using public/images structure
- Use Vercel-specific features or deployment config
- Assume Next 14 features (stay on 13.x compatibility)
- Remove working WebGL detection or capability checks (just neutralize rendering)

**DO:**
- Preserve dark theme everywhere
- Use SmartImage for all images with proper fallbacks
- Keep fogged glass aesthetic with teal accents
- Maintain file-drop image workflow (just drop + reference)
- Test on low-capability devices (no WebGL required)
- Add cosmic dividers between major sections

---

> **When in doubt**: Dark backgrounds, teal accents, glass morphism, real content, smart fallbacks.
