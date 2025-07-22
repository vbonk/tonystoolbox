# Data Models & Schema

## Tables

### `users`
- `id`: UUID (Supabase Auth ID)
- `email`: string
- `role`: string (guest, subscriber, admin)

### `projects`
- `id`: UUID
- `title`: string
- `slug`: string
- `category`: string[]
- `description`: text
- `embed_url`: string
- `is_gated`: boolean
- `created_at`: timestamp

### `tools`
- `id`: UUID
- `name`: string
- `slug`: string
- `affiliate_link`: string
- `category`: string[]
- `tags`: string[]
- `description`: text
- `click_count`: int

### `shortlinks`
- `id`: UUID
- `slug`: string (e.g. /go/toolname)
- `destination`: string (full affiliate URL)
- `clicks`: int
- `last_clicked_at`: timestamp

All schema migrations are handled via Prisma.
