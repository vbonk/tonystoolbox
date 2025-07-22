# Deployment Diagram

```
+-------------------+     Vercel (Frontend + SSR)     +----------------------+
|  GitHub Repo      | ------------------------------> |  Next.js + Tailwind  |
|  (Main Branch)    |  Auto-deploy                    |  ShadCN UI, Framer   |
+-------------------+                                 +----------+-----------+
                                                               |
                                                               |
                                               Route Handlers + API Routes
                                                               |
                                                      +--------v--------+
                                                      |     Supabase     |
                                                      | (DB, Supabase Auth sync) |
                                                      +--------+--------+
                                                               |
                                                      +--------v--------+
                                                      |    Railway DB    |
                                                      +-----------------+
```

Additional components:
- Supabase Auth: Hosted auth provider
- Supabase Edge Functions and Realtime Triggers: Automations (via webhook triggers)
- Resend: Transactional emails
