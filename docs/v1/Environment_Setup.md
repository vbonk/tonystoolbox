# Environment Setup

## Required Variables

Create a `.env` file with the following:

```bash
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
DATABASE_URL=postgresql://...
RESEND_API_KEY=...
```

## Dev Setup

- Run `pnpm install`
- Run `pnpm dev`
- Access: http://localhost:3000

## External Services

- **Supabase Auth**: Auth + role metadata
- **Supabase**: DB + RLS + auth sync
- **Supabase Edge Functions and Realtime Triggers**: Automation flows
- **Vercel**: Deployment + preview envs
