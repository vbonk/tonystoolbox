# Tony’s Toolbox – Strategy Overview

## 1. Project Structure & Content
- Admin UI for project management with category/tag support
- Rich Markdown/MDX descriptions
- Supabase schema with many-to-many categories/tags
- Optional version control with changelogs

## 2. GPT Embeds
- Mix of OpenAI GPTs and custom tools
- Inline or modal embeds
- Secure API proxying via Supabase Edge Functions

## 3. Monetization & Affiliate
- Affiliate links + subscriber-only content
- Cloaked tracked links with conversion funnel
- PostHog for A/B testing and attribution

## 4. Roles & Gating
- guest: public
- subscriber: gated tools, insights
- admin: project CRUD, analytics

## 5. Analytics & Growth
- Key metrics: traffic, conversions, click-through
- Funnels: visitor → tool → CTA → signup
- PostHog features: session replays, feature flags, dashboards

## 6. Technical Direction
- SSG + ISR, minimal SSR
- Supabase SDK + RLS
- TailwindCSS + Framer Motion
- Structured SEO, deferred analytics
