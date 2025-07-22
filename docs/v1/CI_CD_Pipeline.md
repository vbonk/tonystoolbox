# CI/CD Pipeline

### GitHub Actions

#### On Push to `main`
1. **Lint Check**
   - ESLint + Prettier for codebase
   - Markdown and JSON schema validation

2. **Test Suite**
   - Run unit and integration tests
   - Validate Supabase Auth role logic and embed renderers

3. **Build & Deploy**
   - Deploy to Vercel (frontend)
   - Trigger Supabase migrations via Prisma

4. **Post-Deploy**
   - Sentry notifications (release tags, error alerts)
   - Optional: Slack webhook or Discord alert

### Secrets Management
- Use GitHub Actions Secrets for keys
- Supabase Auth + Supabase API keys scoped to env

### Rollbacks
- Rollback to previous Vercel deployment possible via dashboard
- DB versioning via Prisma migration history
