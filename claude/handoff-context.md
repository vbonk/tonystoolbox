# Handoff Context for Claude Code

## Project Name: Tony's Toolbox (tonystoolbox.com)

## 📌 Project Overview
Tony's Toolbox is a professional AI project and automation hub designed to showcase custom GPTs, tools, curated directories, technical content, and project-based apps. It’s built for developers, AI enthusiasts, and marketing professionals to explore, use, and subscribe to AI-powered solutions.

## 🎯 Goals
- Publish Tony’s GPT-based tools, automations, and utilities
- Curate directories of affiliate and open-source tools
- Surface real-time AI news
- Grow an engaged newsletter subscriber base
- Enable analytics-driven insights (PostHog + GA4)
- Provide gated access to premium tools (using Supabase roles)

## 🧱 Tech Stack
- **Frontend:** Next.js (App Router), TailwindCSS, ShadCN/UI, Framer Motion
- **Backend/Auth:** Supabase (auth, Postgres, edge functions, RLS policies)
- **Automation:** GitHub Actions for CI/CD, analytics event tracking, n8n for feeds (TBD)
- **Monitoring:** Sentry, PostHog, Google Analytics
- **Database:** PostgreSQL with Prisma ORM
- **Hosting:** Vercel (frontend) + Supabase (backend)

## 🧩 Features
- Dynamic `/projects` and `/projects/[slug]` pages with category filtering
- Supabase role-based gating for `/admin`, `/account`, `/analytics`
- Fully versioned docs in `/docs/v1/` and `/docs/analytics/`
- Built-in analytics tracking (PostHog, GA4)
- Edge functions + RLS for secure, low-latency data ops
- Markdown-driven content and project descriptions

## 🤖 Custom Events Tracked
- `project_viewed`
- `affiliate_clicked`
- `tool_launched`
- `newsletter_subscribed`

## 🔒 Roles & Permissions (Supabase)
- `guest`: public
- `subscriber`: newsletter tools
- `admin`: dashboard access

## ✅ Handoff Instructions
Claude, please pick up from:
1. Ensuring routing is complete and gated with `admin` RLS
2. Verifying PostHog dashboards display as expected
3. Expanding `/admin/analytics` UI with dynamic data
4. Supporting `/projects/[categorySlug]` SEO and SSG
5. Polish pass for `/docs/v1/` consistency
6. Prepare GitHub publishing and CI/CD action testing

## 📦 Zip Package
The full project state is in `tonystoolbox-docs-v17-analytics-integrated.zip`
