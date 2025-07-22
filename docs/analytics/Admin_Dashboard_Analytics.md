# Admin Analytics Dashboard

The `/admin/analytics` route provides embedded dashboards and restricted views.

## Features
- Embedded PostHog insights
- Supabase-based `admin` role checks
- Optional: dynamic charts and stats

## Code Summary
- Uses `useUser()` from Supabase helpers
- Checks metadata role
- Fallbacks to homepage if unauthorized
