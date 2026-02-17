# Agothe.ai

AI-Powered Research Synthesis & Crisis Intelligence platform.

## Quick Links

- **[Image Drop-and-Appear Guide](./IMAGES.md)** - Simple workflow to add images without code changes
- **[Design Invariants](./.github/agents/design-invariants.md)** - Non-negotiable design rules

## Adding Images

The easiest way to add images to the website is to use our **drop-and-appear workflow**:

1. Drop your image into `/public/images/heroes/` with the correct filename
2. Refresh the page — your image appears automatically!

See **[IMAGES.md](./IMAGES.md)** for complete documentation.

### Landing Page Hero

To add or change the landing page hero image:
- File: `/public/images/heroes/landing-substrate.webp`
- Format: WebP (1920x1080 or higher)
- Just drop the file and refresh!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Netlify

## Project Structure

```
/app                    # Next.js app router pages
/components/agothe      # Core components (SmartImage, Hero, etc.)
/public/images          # Image assets (drop-and-appear workflow)
/lib                    # Utilities and data
```
