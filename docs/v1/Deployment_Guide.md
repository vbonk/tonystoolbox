# 🚀 Deployment Guide (Vercel + Supabase)

## 1. 🛠️ Local Setup

- Clone repo
- Run `supabase init`
- Add `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```
## 2. 🧪 Local Dev

```bash
supabase start
npm run dev
```
## 3. 🔄 Deploy Supabase Backend

```bash
supabase db push
supabase functions deploy rss-ingest
```
## 4. ⚙️ Vercel Deployment

- Connect GitHub repo to Vercel
- Add env vars via dashboard
- Enable auto-deploy from `main`

## 5. ✅ Post-Deploy Checks

- Test gated routes and RLS
- Confirm functions are responding
- Monitor logs: `supabase logs` and Vercel dashboard
