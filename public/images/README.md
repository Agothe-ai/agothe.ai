# Agothe.ai Image Assets

This directory contains all image assets for the Agothe.ai platform. The structure follows the design invariants and supports a "file drop = live" workflow.

## Directory Structure

```
/public/images/
├── heroes/           # Page hero images (16 files)
├── icons/            # Entity icons (64x64px)
├── backgrounds/      # Section background textures
├── sections/         # In-page section images
├── chronica/         # Chronica-specific assets
├── video/            # Video backgrounds with fallbacks
├── utility/          # Fallbacks & placeholders
└── couture/          # Couture vertical (8 subdirectories)
    ├── hero/
    ├── editorial/
    ├── lookbook/
    ├── collection/
    ├── textures/
    ├── transformation/
    ├── directors/
    └── seeds/
```

## How It Works

### File Drop = Live
Simply drop an image file into the correct directory with the correct filename, and it will appear automatically on the site. No code changes needed (except for couture, which also requires data entry in `lib/couture-data.ts`).

### Components
All images are rendered through safe components with fallback handling:
- **SmartImage** - Main image component with automatic fallback to `/images/utility/fallback-dark.svg`
- **EntityIcon** - Icon component with teal circle fallback (sm/md/lg sizes)
- **VideoBackground** - Video player with static image fallback

### Image Guidelines
- **Format**: WebP (preferred) for optimal performance
- **Hero images**: Use `priority={true}` for above-fold loading
- **Below-fold images**: Lazy loaded by default (no priority prop)
- **Dimensions**: Always specify width/height to prevent CLS (Cumulative Layout Shift)
- **Dark theme**: All images should work well on dark backgrounds (#0a0a0a)

## Quick Reference

### Hero Images (16 files)
See [heroes/README.md](./heroes/README.md) for complete list of required filenames mapped to pages.

### Entity Icons
See [icons/README.md](./icons/README.md) for CAPS network entities, core entities, team members, and engines.

### Couture Assets
See subdirectories under [couture/](./couture/) for editorial, lookbook, collection, textures, transformation phases, directors, and seeds.

## Performance Notes
- Hero images load with `priority={true}`
- All other images lazy load
- WebP format is optimized in `next.config.js`
- SmartImage handles errors gracefully with fallback
- EntityIcon provides teal circle fallback for missing icons

## Design System Compliance
This structure follows the Agothe.ai design invariants:
- Dark theme only (no light backgrounds)
- Teal (#00f0ff) and gold (#ffd700) accent colors
- Glass morphism aesthetic
- Cosmic/organic visual language
- Real content, not placeholders
