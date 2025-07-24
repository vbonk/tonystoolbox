# CLAUDE.md - Tony's Toolbox Public Repository

This file provides guidance to Claude Code (claude.ai/code) when working with the **PUBLIC** repository for Tony's Toolbox.

**🚨 CRITICAL CLAUDE FILE MANAGEMENT DIRECTIVES:**
- **ALL** Claude session files, development logs, and AI context MUST be written to the **PRIVATE** repository
- **NEVER** create, modify, or store Claude session files in this public repository
- **ALWAYS** use absolute paths to write Claude files to: `/Users/tony/Projects/tonystoolbox-internal/claude/`
- **VERIFY** working directory before any Claude-related file operations

## 🔗 Repository Context & Directory Management

This is the **PUBLIC** repository for Tony's Toolbox - a comprehensive AI tool hub and developer resource platform.

### **Repository Locations**
- **Public Repository** (this repo): `/Users/tony/Projects/tonystoolbox` 
  - GitHub: `https://github.com/vbonk/tonystoolbox.git` (PUBLIC)
  - Purpose: Technical implementation, open-source code, and community-facing documentation
- **Private Repository**: `/Users/tony/Projects/tonystoolbox-internal`
  - GitHub: `https://github.com/vbonk/tonystoolbox-internal.git` (PRIVATE)
  - Purpose: Business strategy, Claude session logs, development context, and sensitive documentation

### **Claude Code Working Directory Guidelines**
**CRITICAL**: Always be explicit about which repository you're working in:

1. **When starting any task**, explicitly check your current working directory with `pwd`
2. **When switching between repos**, always use absolute paths:
   ```bash
   cd /Users/tony/Projects/tonystoolbox           # For public repo work
   cd /Users/tony/Projects/tonystoolbox-internal  # For private repo work
   ```
3. **Before Git operations**, verify you're in the correct repository:
   ```bash
   git remote -v  # Confirm you're in the right repo
   ```

### **Repository Usage Decision Framework**

**Use PUBLIC repo (`/Users/tony/Projects/tonystoolbox`) for:**
- Code implementation and features
- Component development
- Package.json, dependencies, build configs
- Public documentation and README files
- Bug fixes and technical improvements
- Open-source patterns and examples
- Technical architecture documentation
- User-facing help and support docs

**Use PRIVATE repo (`/Users/tony/Projects/tonystoolbox-internal`) for:**
- **ALL Claude session files and development logs**
- Business strategy and competitive analysis
- Financial planning and internal roadmaps
- Team processes and sensitive documentation
- Customer research and market analysis
- Internal tooling and automation scripts
- Strategic metrics and KPIs
- Marketing plans and growth strategies

**⚠️ REPOSITORY INTEGRITY RULES**:
- **NEVER** create subdirectories with the other repo's name
- **ALWAYS** verify working directory before Git operations
- **ALWAYS** double-check remote URLs before pushing
- **NEVER** commit sensitive private repo content to public repo
- **MANDATORY**: All Claude files go to private repo only

## 🏗️ Project Architecture & Stack

**Tony's Toolbox** is a modern full-stack AI tool hub built with:

### **Frontend Stack**
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: TailwindCSS + ShadCN UI component library
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library
- **Responsive Design**: Mobile-first approach with accessibility (WCAG 2.1)

### **Backend & Database (Updated January 24, 2025)**
- **API**: Next.js API routes with TypeScript (in development)
- **Database**: PostgreSQL on Hetzner via Coolify with Prisma ORM ✅ **IMPLEMENTED**
- **Authentication**: Clerk.dev with role-based access control (UI pending)
- **ORM**: Prisma with 11 comprehensive models ✅ **IMPLEMENTED**
- **Type Safety**: Full TypeScript integration with Prisma-generated types ✅ **IMPLEMENTED**
- **Development Tools**: Prisma Studio, seeding scripts, automated setup ✅ **IMPLEMENTED**

### **Infrastructure & Deployment**
- **Full-Stack Hosting**: Coolify on Hetzner infrastructure
- **Database**: Self-hosted PostgreSQL via Coolify
- **CDN**: Cloudflare proxy and R2 storage
- **Domain**: Custom domain with Cloudflare SSL
- **Monitoring**: Sentry for error tracking + Coolify metrics

### **Authentication & User Management**
- **Provider**: Clerk.dev
- **User Roles**: `guest`, `subscriber`, `admin`
- **Access Control**: Custom middleware with role-based permissions
- **Session Management**: Clerk.dev JWT tokens with automatic refresh

## 🎯 Core Features & Components

### **Primary Features**
1. **AI Tool Directory**: Curated collection of AI tools with affiliate tracking
2. **GPT Embed Viewer**: Sandboxed iframe system for custom GPT demonstrations
3. **Project Showcase**: Interactive demos of AI-powered projects
4. **News Feed**: Real-time AI industry news aggregation
5. **Short Link System**: Branded URL shortening with analytics
6. **User Dashboard**: Personalized experience based on subscription tier

### **Key Components**
- `GPTEmbedViewer.tsx`: Secure iframe container for GPT tool embeds
- `NewsWall.tsx`: Real-time AI news feed with RSS fallback
- `ShortlinkRedirect.ts`: Server-side redirects with click tracking
- `UserDashboard.tsx`: Role-based dashboard with personalized content
- `ToolDirectory.tsx`: Searchable/filterable AI tool catalog
- `SubscriptionGate.tsx`: Premium content access control

### **Data Models**
- **users**: Clerk.dev integration with role metadata and preferences
- **projects**: AI tool showcases with embed configurations and metrics
- **tools**: AI tool directory entries with affiliate links and categories
- **shortlinks**: Branded URL redirects with comprehensive analytics
- **news_items**: AI industry news with categorization and trending
- **user_interactions**: Behavioral tracking for personalization

## 🛠️ Development Commands & Setup

**Package Manager**: pnpm (required)
```bash
# Development
pnpm install        # Install dependencies
pnpm dev            # Start development server (http://localhost:3000)
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint + Prettier
pnpm lint:fix       # Fix linting issues automatically
pnpm type-check     # Run TypeScript compiler check
pnpm test           # Run unit and integration tests
pnpm test:watch     # Run tests in watch mode
```

**Database Commands (Updated January 24, 2025)**:
```bash
# Quick Setup
npm run setup               # Complete database setup (recommended for new setup)

# Development Database Management
npm run db:generate         # Generate Prisma client
npm run db:push             # Push schema changes to database
npm run db:migrate          # Create and apply new migration
npm run db:deploy           # Deploy migrations to production
npm run db:studio           # Open Prisma Studio (database GUI)
npm run db:seed             # Run database seeding scripts
npm run db:reset            # Reset database and reseed with sample data

# Direct Prisma Commands (alternative)
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema changes to database
```

## 🔐 Environment Configuration

**Required Environment Variables**:
```bash
# Clerk.dev Authentication
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Hetzner PostgreSQL (via Coolify)
DATABASE_URL=postgresql://postgres:password@hetzner-host:5432/tonystoolbox

# External Services
RESEND_API_KEY=re_...                    # Email service
POSTHOG_API_KEY=phc_...                  # Analytics (optional)
SENTRY_DSN=https://...                   # Error tracking
NEXT_PUBLIC_SITE_URL=https://tonystoolbox.com

# Development
NODE_ENV=development|production
NEXT_PUBLIC_APP_ENV=development|staging|production
```

## 🧪 Development Workflow

### **Claude Code Integration**
When working with Claude Code:

**Session Start Protocol:**
1. **Always start by checking current working directory**: `pwd`  
2. **Verify which repository you're in**: `git remote -v`
3. **Reference both repositories for complete context**
4. **ALL Claude session files MUST go to private repo**

**Repository-Specific Workflows:**
- **Technical Implementation** (Public Repo):
  ```bash
  cd /Users/tony/Projects/tonystoolbox
  git remote -v  # Should show: https://github.com/vbonk/tonystoolbox.git
  # Implement features, fix bugs, update components, documentation
  ```
- **Claude Session Documentation** (Private Repo):
  ```bash
  cd /Users/tony/Projects/tonystoolbox-internal
  git remote -v  # Should show: https://github.com/vbonk/tonystoolbox-internal.git
  # Document sessions, strategic decisions, development context
  ```

**Cross-Repository Context:**
- Read context from both repos but work in the appropriate one
- Use absolute paths when referencing files from the other repo
- Never assume current directory - always verify before operations
- **CRITICAL**: All Claude development logs go to private repo only

### **Quality Assurance Standards**
1. **Code Quality**: ESLint + Prettier for consistent formatting
2. **Accessibility**: WCAG 2.1 AA compliance for all public interfaces
3. **Type Safety**: Strict TypeScript configuration with no implicit any
4. **Testing**: Unit tests for business logic, integration tests for API routes
5. **Performance**: Core Web Vitals optimization, <2s load times
6. **Security**: Input validation, XSS prevention, secure authentication flows

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/feature-name
git add .
git commit -m "feat: descriptive commit message"
git push origin feature/feature-name

# Code review and merge via GitHub PR
# Automatic deployment via Vercel on merge to main
```

## 🚀 Current Project Status (January 2025)

### ✅ Completed Infrastructure (Updated January 24, 2025)
- Next.js 14 application with App Router and TypeScript
- TailwindCSS + ShadCN UI design system implementation  
- Logo integration and comprehensive brand identity
- Component library (Logo, Cards, Buttons, Forms, Navigation)
- ESLint and Prettier configuration for code quality
- Dual repository strategy with security-focused .gitignore
- GitHub repository setup with automated CI/CD pipeline
- **🎉 MAJOR**: Complete Prisma database schema with 11 comprehensive models
- **🎉 MAJOR**: Infrastructure migration from Supabase to Prisma + Clerk + Hetzner/Coolify
- **🎉 MAJOR**: Database seeding scripts and automated setup tools
- **🎉 MAJOR**: Full TypeScript integration with Prisma-generated types

### 🔄 Current Development Focus (Updated January 24, 2025)
- **Frontend Integration**: Connect React components to Prisma database
- **Authentication UI**: Complete Clerk.dev frontend integration
- **API Development**: Create Next.js API routes for CRUD operations
- **Core Components**: GPTEmbedViewer, ToolDirectory, ProjectShowcase
- **User Experience**: Role-based dashboards and personalized features

### 📋 Immediate Next Steps (Updated January 24, 2025)
1. **API Routes**: Implement Next.js API endpoints for database operations
2. **Authentication Components**: Complete Clerk.dev UI integration
3. **Database-Connected Components**: Tools directory, project showcase, user dashboard
4. **GPT Integration**: Secure iframe embedding system for custom GPTs
5. **Analytics Integration**: PostHog setup with database event tracking
6. **User Features**: Favorites, reviews, affiliate link tracking

### 🎯 Strategic Objectives
- **Community Building**: Foster an engaged community of AI tool users
- **Revenue Generation**: Sustainable affiliate commission model
- **User Value**: Become the go-to resource for AI tool discovery
- **Technical Excellence**: Maintain high code quality and performance standards
- **Scalability**: Architecture that supports rapid user growth

## 📚 Integration Points & External Services

### **Email & Communications**
- **Transactional Email**: Resend for auth confirmations and notifications
- **Newsletter**: ConvertKit integration for community updates
- **Support**: Integrated help desk with Supabase backend

### **Analytics & Monitoring**
- **User Analytics**: PostHog for behavioral insights and feature usage
- **Performance Monitoring**: Sentry for error tracking and performance
- **Uptime Monitoring**: UptimeRobot for service availability
- **Database Analytics**: Supabase built-in analytics dashboard

### **Content & Media**
- **Image Optimization**: Next.js Image component with Vercel optimization
- **CDN**: Vercel Edge Network for global content delivery
- **News Aggregation**: RSS.app for AI industry news feeds
- **SEO**: Next.js sitemap generation and meta tag optimization

## 🛡️ Security Considerations

- **Authentication Security**: Supabase Auth with JWT tokens and secure session management
- **Data Protection**: Row Level Security (RLS) policies for multi-tenant data isolation
- **Input Validation**: Server-side validation for all user inputs and API routes
- **XSS Prevention**: Content Security Policy headers and input sanitization
- **Rate Limiting**: API endpoint protection against abuse and DDoS
- **Iframe Security**: Sandbox attributes and domain restrictions for GPT embeds
- **Environment Security**: Secure secret management and environment variable protection

## 📖 Documentation Standards

All public documentation should be:
- **Clear and Concise**: Easy to understand for developers of all skill levels
- **Up-to-Date**: Regularly maintained and synchronized with codebase changes
- **Comprehensive**: Cover both basic usage and advanced configuration
- **Accessible**: Follow documentation accessibility guidelines
- **Searchable**: Structured for easy discovery and navigation

**Remember**: This is a PUBLIC repository - keep sensitive business information, API keys, and strategic documents in the private repository at all times.