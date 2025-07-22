# Codebase Walkthrough

## App Structure (`/app`)
- Uses Next.js App Router with `layout.tsx`, `page.tsx` per route
- Auth-wrapped routes like `/admin`, `/account`

## Components (`/components`)
- Shared UI using ShadCN (e.g., buttons, cards, modals)
- Custom GPT embed viewer
- Newswall renderer with fallback handling

## Libs (`/lib`)
- `auth.ts`: Supabase Auth helpers
- `shortlinks.ts`: Affiliate redirection logic
- `feeds.ts`: RSS fetch + cache logic

## Prisma (`/prisma`)
- `schema.prisma`: Full DB structure
- `migrations/`: Git-tracked DB changes

## Pages/API (`/pages/api`)
- `/track-click.ts`: Redirect + increment
- `/feed-cache.ts`: Admin-triggered news caching
