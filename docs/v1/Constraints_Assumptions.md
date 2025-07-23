# Constraints & Assumptions

## Constraints
- Must use Supabase Auth (>=2.4.0) for role-based auth
- Hosted on Vercel (frontend) with Supabase PostgreSQL (DB)
- Budget constraints require minimal external paid APIs
- Supabase Edge Functions and Realtime Triggers automation required for changelog/news sync

## Assumptions
- Users will tolerate gated content if signup is simple
- RSS sources will remain reliable but may have outages
- Affiliate platforms will continue to support tracking
- Supabase + Prisma will meet all real-time and auth-bound data needs
