# Security Model

## Authentication
- All user auth handled via Supabase Auth OAuth or email magic link
- Sessions are tokenized and managed via Supabase Auth's SDK
- Auth flows are pre-built and validated

## Authorization
- Role-based access control:
  - `guest`: public only
  - `subscriber`: gated project access
  - `admin`: full admin dashboard
- Role stored in `user.custom user metadata table or Supabase roles via RLS.role`

## Additional Security
- Shortlink redirects have rate limiting to prevent abuse
- All affiliate URLs are validated before redirect
- API keys (e.g., OpenAI, Claude) never exposed — proxied server-side
- Supabase policies enable row-level auth (RLS)
- Global CSP headers for iframe sandboxing

## Monitoring
- Sentry captures frontend + backend errors, flagged by severity and context