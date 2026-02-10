# Agothe.ai Development Standards

## Architecture
- Next.js 14 App Router (not Pages Router)
- All pages in app/ directory
- All components in components/agothe/
- Motion/animation components in src/components/motion/
- Database: Supabase with Row Level Security (RLS) enabled
- Deployment: Vercel

## Design System: Obsidian Glassmorphism
- Background (Void): #0a0a0a
- Primary text: #f5f5f5 (soft white)
- Muted text: #a0a0a0
- Accent teal: #00f0ff
- Accent gold: #ffd700
- Danger/alert/collapse: #ff3366
- Deep background (violet): #1a0033
- Chrome/metal: #94a3b8
- Rose gold: #f59e0b
- Safe/stable (green): #10b981
- Simulation (purple): #8b5cf6
- Electric blue: #3b82f6

## Page-Specific Accent Colors
- / → #00f0ff (teal)
- /intelligence → #ffd700 (gold)
- /solvey → #ff3366 (red)
- /simulation → #8b5cf6 (purple)
- /city → #3b82f6 (blue)
- /vr → #10b981 (green)
- /couture → #f59e0b (rose gold)
- /institutes → #94a3b8 (chrome)
- /propaganda → #ff3366 (red)
- /about → #f5f5f5 (white)
- /research → #00f0ff (teal)
- /framework → #06b6d4
- /transmissions → #f59e0b
- /os → #00f0ff

## Typography
- Headings: Space Grotesk (weight 700)
- Body: Inter (weights 400, 500)
- Code/metrics: JetBrains Mono (weights 400, 700)

## Glass Card Treatment (Apply to ALL cards/containers)
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 12px;
backdrop-filter: blur(12px);
Hover: border → rgba(0,240,255,0.3), box-shadow: 0 0 30px rgba(0,240,255,0.08)

## Animation Standards
- Primary: Framer Motion
- Secondary (scroll-driven): GSAP + ScrollTrigger
- All animations must respect prefers-reduced-motion
- Lazy load Three.js/WebGL with React.lazy() + Suspense
- Canvas animations capped at 30fps
- Use will-change sparingly, remove after animation completes

## Easing Curves (Chronica Panel)
- CHRONA (patient reveals): cubic-bezier(0.25, 0.46, 0.45, 0.94)
- MORPHE (sharp snap): cubic-bezier(0.68, -0.55, 0.27, 1.55)
- LUMIERE (light falloff): cubic-bezier(0.4, 0, 0.2, 1)
- VELUM (fabric overshoot): cubic-bezier(0.22, 1, 0.36, 1)
- SILHOUETTA (shadow geometry): cubic-bezier(0.5, 0, 0, 1)

## Unicode Standards
- Always use the actual character δ_H (not the escape sequence)
- Use proper typographic apostrophes (not Unicode escapes)
- Use proper em dashes (not Unicode escapes)
- Use proper quotation marks (not Unicode escapes)

## Component Patterns
- Service pages extend ServicePageTemplate
- All forms use Supabase server actions (not client mutations)
- All interactive elements have aria-labels
- Mobile-first responsive design
- Every animation component must export a static fallback

## Performance Budget
- LCP < 2.5s
- CLS < 0.1
- Total animation component weight < 200KB
- No animation blocks initial page render
- Lighthouse target: 90+ performance

## Git Workflow
- Branch naming: feature/*, fix/*, docs/*, audit/*
- Commit messages: Conventional Commits format
- Always run npm run build before creating PR
- Test on mobile viewport (390x844) before merging
