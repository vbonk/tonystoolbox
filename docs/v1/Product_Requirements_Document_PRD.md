# 📕 Product Requirements Document (PRD) – Tony’s Toolbox

## 1. Overview

Tony’s Toolbox is a full-featured platform for publishing, demonstrating, and monetizing AI-powered projects and tools. It serves as both a personal lab and a public-facing application that includes gated content, affiliate monetization, technical blogging, and automation flows.

This PRD defines the MVP scope, core features, technical design, and metrics for evaluating project success.

---

## 2. Goals

- Provide a robust system for showcasing and managing AI tools, GPT demos, and development projects.
- Create a monetizable affiliate tool directory with analytics and filtering.
- Enable real-time AI content delivery via an automated RSS newsfeed.
- Establish gated access for subscribers and secure admin tools for content management.
- Track key engagement metrics (tool clicks, project views, conversion rates).

---

## 3. Functional Requirements

### Public Pages
- `/projects`: View all live apps/tools with categories and tags
- `/directory`: Filterable tool listings with affiliate tracking
- `/newsfeed`: Aggregated RSS feed with visual layout
- `/blog`: Markdown/MDX content, sortable and tagged
- `/go/:slug`: Shortlink redirect with logging
- `/account`: User profile and role-based access

### Auth and User Management
- Sign in via Supabase Auth (Google, email magic link)
- Role-based access: guest, subscriber, admin
- Access control for gated project content

### Admin Features
- Add/edit projects, tools, tags
- View click and usage analytics
- Trigger changelog or blog updates via GitHub/Supabase Edge Functions and Realtime Triggers

### Automation
- RSS polling + fallback cache
- GitHub webhook triggers for publishing
- Supabase Edge Functions and Realtime Triggers workflows for monitoring and release coordination

---

## 4. Non-Functional Requirements

- Must use secure, scalable serverless hosting
- UI must be responsive and optimized for mobile
- Performance goal: <500ms TTFB, <1s LCP
- Accessibility: WCAG 2.1 compliance
- Security: Auth session enforcement, API key proxying, rate limiting

---

## 5. Metrics & KPIs

- 🚀 1,000 subscribers in 6 months
- 🔗 20% CTR on affiliate links
- 📈 Bounce rate < 30%
- 🛠 At least 20 projects/tools published in first 90 days

---

## 6. Constraints

- Must use Supabase Auth (>=2.4.0)
- Hosted on Vercel and Railway
- No premium API usage (unless usage tiers added)
- Free-tier RSS tools must be supported or cached

---

## 7. Milestones

| Milestone | Deliverable |
|-----------|-------------|
| MVP Launch | All public pages + gated auth flow |
| v1.1 | Admin panel, shortlink tracking |
| v1.2 | Automated changelog & email digest |
| v2.0 | Subscriber tiers, public API |
