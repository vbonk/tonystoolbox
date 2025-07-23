# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔗 Repository Context

This is the **PUBLIC** repository for Tony's Toolbox. For comprehensive development context, business strategy, and sensitive information, also reference the **PRIVATE** repository:

- **Public Repository** (this repo): `tonystoolbox`
- **Private Repository**: `tonystoolbox-internal` (contains business strategy, development context, and sensitive docs)

**Decision Framework**: Use public repo for technical implementation, private repo for business context and strategic decisions.

## Development Commands

**Package Manager**: pnpm
```bash
pnpm install        # Install dependencies
pnpm dev            # Start development server (http://localhost:3000)
pnpm build          # Build for production
pnpm lint           # Run ESLint + Prettier
pnpm test           # Run unit and integration tests
```

**Database Commands**:
```bash
npx prisma migrate dev      # Apply Prisma migrations (development)
npx prisma migrate deploy   # Apply Prisma migrations (production)
npx prisma generate         # Generate Prisma client
```

## Architecture Overview

**Tony's Toolbox** is a full-stack AI tool hub built with Next.js (App Router), featuring:

- **Frontend**: Next.js + TailwindCSS + ShadCN UI + Framer Motion
- **Backend**: Next.js API routes + Supabase (DB + Auth) + Prisma ORM
- **Database**: PostgreSQL (Railway) with role-based access control
- **Hosting**: Vercel (frontend) + Railway (database)
- **Auth**: Supabase Auth with role metadata (guest/subscriber/admin)
- **Automation**: Supabase Edge Functions and Realtime Triggers
- **Monitoring**: Sentry + UptimeRobot

## Key Features & Components

### Authentication & Authorization
- Uses Supabase Auth for user management
- Role-based access: `guest`, `subscriber`, `admin`
- Gated content for premium subscribers
- Row Level Security (RLS) implemented

### Core Data Models
- **users**: Supabase Auth integration with role metadata
- **projects**: AI tool showcases with embeddable GPT demos
- **tools**: Affiliate tool directory with click tracking
- **shortlinks**: Tracked redirect URLs for analytics

### Key Components
- `GPTEmbedViewer.tsx`: Sandboxed iframe for GPT tool embeds
- `NewsWall.tsx`: Real-time AI news feed with RSS fallback
- `ShortlinkRedirect.ts`: Server-side redirects with analytics

## Environment Setup

Required environment variables:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://...

# Email Service
RESEND_API_KEY=...
```

## Development Workflow

### **Dual Repository Strategy**
Tony's Toolbox uses a dual-repository approach:

**PUBLIC Repository** (this repo):
- Technical implementation and features
- Community-facing documentation
- Open-source components and patterns
- Bug reports and feature requests

**PRIVATE Repository** (`tonystoolbox-internal`):
- Business strategy and competitive analysis
- Development context and session logs
- Financial planning and internal roadmaps
- Team processes and sensitive documentation

### **Claude Code Integration**
When working with Claude Code:
1. Reference both repositories for complete context
2. Implement technical changes in public repo
3. Document strategic decisions in private repo
4. Update session context in private repo after each session

### **Standard Workflow**
1. **Code Quality**: ESLint + Prettier for formatting, WCAG 2.1 accessibility compliance
2. **Testing**: Unit and integration tests for auth logic and embed renderers
3. **CI/CD**: GitHub Actions pipeline (lint → test → build → deploy)
4. **Deployment**: Automatic Vercel deployment on push to main
5. **Monitoring**: Sentry for error tracking, automated release notifications

## Security Considerations

- All GPT embeds use iframe sandboxing for security
- Rate limiting on shortlink redirects to prevent abuse
- Supabase RLS policies enforce role-based data access
- No sensitive data (API keys, tokens) in client-side code

## Integration Points

- **Email**: Resend/Postmark for transactional emails
- **Analytics**: PostHog for behavioral tracking (optional)
- **News Feed**: RSS.app for AI news aggregation
- **Automation**: Supabase Edge Functions and Realtime Triggers for workflow triggers
- **Error Tracking**: Sentry with environment-specific alerts