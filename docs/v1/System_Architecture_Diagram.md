# System Architecture Diagram

Tony's Toolbox is a modular, full-stack web platform with clearly separated concerns:

```
[ Client (Next.js + Tailwind) ]
        |
        |--> /projects (SSR + embeds)
        |--> /directory (tool list)
        |--> /newsfeed (RSS content)
        |
        v
[ API Routes / Route Handlers ]
        |
        |--> /api/track-click (shortlink redirects)
        |--> /api/feed-cache (RSS cache fallback)
        |
        v
[ Backend Services ]
    - Supabase (DB + Supabase Auth integration)
    - Supabase Edge Functions and Realtime Triggers (automation triggers)
    - Resend (emails)
        |
        v
[ PostgreSQL (Railway) ]
        |
        v
[ Admin Dashboard + Auth (Supabase Auth) ]
```

System design is event-driven with low coupling between project publishing, analytics, and automation.
