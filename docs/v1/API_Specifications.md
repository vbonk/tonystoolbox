# API Specifications

## `GET /api/track-click?slug=toolname`
Redirects user to the appropriate affiliate link and logs click.

- **Params:** slug (string)
- **Returns:** 302 redirect
- **Side Effect:** increments click count

## `POST /api/feed-cache`
Caches fallback content for RSS feeds.

- **Body:** JSON `{ feedType: "news" | "tools", content: [...] }`
- **Auth:** Admin only
- **Returns:** 200 OK

## `GET /api/user-role`
Returns current Supabase Auth-authenticated user's role.

- **Returns:** `{ role: "guest" | "subscriber" | "admin" }`

All routes are protected using Supabase Auth Supabase-compatible server-side auth or edge middleware or server-side SQL-based RLS policy using `auth.uid()` or joined roless.