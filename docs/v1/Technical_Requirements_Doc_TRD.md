# Technical Requirements Document (TRD)

## Frontend
- Framework: Next.js (App Router)
- Styling: TailwindCSS + ShadCN UI
- Animation: Framer Motion
- State/Data: React Query or SWR
- Accessibility: WCAG 2.1 compliance

## Backend
- API routes via Next.js handlers
- Supabase Auth Supabase-compatible server-side auth or edge middleware for auth
- Supabase for database, Supabase Auth sync, RLS
- Prisma ORM for schema and migrations

## Hosting
- Vercel for frontend
- Supabase PostgreSQL for database
- Supabase Edge Functions and Realtime Triggers hosted externally

## Monitoring
- Sentry for frontend/backend observability
- UptimeRobot for feed and site status

## DevOps
- GitHub Actions: lint, test, deploy
- Automated changelog generation (via git-cliff or similar)