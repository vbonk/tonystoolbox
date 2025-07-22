# Tony's Toolbox

A modern, full-stack AI tool hub built with Next.js, TailwindCSS, Supabase, Supabase Auth, and automation via Supabase Edge Functions and Realtime Triggers.

## 📦 Features
- AI project showcase pages with live GPT embeds
- Gated content with subscriber role management
- Affiliate tools directory with shortlink tracking
- Real-time newsfeed via RSS + fallback caching
- Blog support with Markdown/MDX and structured data
- CI/CD via GitHub Actions + Vercel + Prisma migrations

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/tonystoolbox.git
cd tonystoolbox
pnpm install
cp .env.example .env
pnpm dev
```

## 🛠 Deployment
- Frontend: Vercel
- Database: Railway (PostgreSQL)
- Automation: Supabase Edge Functions and Realtime Triggers (webhook-triggered)

## 📁 Project Structure
- `/app`: App Router pages and layouts
- `/components`: UI components
- `/lib`: Utility and API logic
- `/public`: Static assets
- `/prisma`: Prisma schema and migrations
