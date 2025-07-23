# 📘 Project Overview – Tony's Toolbox

## 🔍 What is Tony’s Toolbox?

Tony’s Toolbox is a modern, full-stack web platform designed to showcase the work, tools, and technologies used by Tony Velt, with a particular focus on AI, automation, and modern web development. The platform provides gated access to exclusive projects, public directories of AI tools, technical blog content, and a real-time AI newsfeed — all unified under a secure, responsive, and scalable architecture.

This is more than a portfolio — it’s a full-featured application demonstrating real use cases, data tracking, and community-building potential around AI-powered SaaS and tooling.

---

## 🎯 Use Cases

| Use Case | Description |
|----------|-------------|
| **Project Showcase** | Highlight live GPT tools, automation apps, and side projects with interactive embeds |
| **Gated Tools** | Provide subscriber-only access to premium tools and dashboards |
| **Affiliate Tool Directory** | Curated list of AI tools with tracked shortlinks and filterable categories |
| **AI Newsfeed** | Real-time RSS feed of AI headlines with fallback and error handling |
| **Admin CMS** | Backend management of projects, tools, analytics, and shortlinks |
| **Automation Triggers** | Auto-publish content via GitHub, RSS, or Supabase Edge Functions and Realtime Triggers flows |
| **Performance & Error Monitoring** | Use Sentry and uptime tools to track app health |

---

## ✨ Features & Functions

- ✅ Role-based authentication and access (Supabase Auth)
- ✅ Embeddable GPT and automation demos
- ✅ Responsive directory with affiliate click tracking
- ✅ Markdown-based blog and documentation system
- ✅ Admin panel to manage projects, tools, and metadata
- ✅ CI/CD with GitHub Actions + Prisma migrations
- ✅ Automated workflows via Supabase Edge Functions and Realtime Triggers
- ✅ SEO optimization and social preview assets

---

## 🧩 Technical Architecture

**Frontend:**
- Next.js (App Router)
- TailwindCSS + ShadCN UI
- Framer Motion for animations
- React Query/SWR for data fetching
- Lazy loading and iframe sandboxing

**Backend/API:**
- API routes and route handlers in Next.js
- Supabase for DB and real-time sync
- Supabase Auth for authentication and user metadata

**Database:**
- Supabase PostgreSQL
- Prisma ORM for schema, role enforcement, and migrations

**DevOps & Monitoring:**
- GitHub Actions for CI
- Sentry for full-stack observability
- UptimeRobot for external checks
- PostHog (optional) for A/B and behavioral analytics

**Hosting & Integration:**
- Vercel for frontend and SSR
- Supabase PostgreSQL for managed database
- Resend/Postmark for transactional email
- RSS.app for news aggregation
