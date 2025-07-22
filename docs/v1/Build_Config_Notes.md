# Build Config Notes

## GitHub Actions
- Lint all `.ts`, `.tsx`, `.md`, `.json`
- Run tests via `pnpm test`
- Deploy on push to `main` branch

## Prisma
- `prisma generate` for local client
- `prisma migrate deploy` on Vercel

## Tailwind
- Purges unused classes for production
- Dark mode toggle via class strategy

## Edge Cases
- Redirect route must be excluded from static export
- Ensure .env vars present in Vercel settings

## Build Warnings
- Avoid hydration mismatches (e.g., conditional embeds)
- Watch for undefined Supabase Auth context in SSR routes
