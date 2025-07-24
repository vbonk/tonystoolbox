# Database Setup Guide

This guide walks you through setting up the PostgreSQL database for Tony's Toolbox using Prisma.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- Environment variables configured

## Quick Setup

For a quick setup with default configuration:

```bash
npm run setup
```

This command will:
1. Generate the Prisma client
2. Create database tables
3. Seed with sample data

## Manual Setup

### 1. Environment Configuration

Copy the example environment file and configure your database:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tonystoolbox"
```

### 2. Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Create and apply migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:reset` | Reset database and reseed |

### 3. Step-by-Step Setup

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npm run db:generate

# 3. Create database tables
npm run db:push

# 4. Seed with sample data
npm run db:seed
```

## Database Schema Overview

### Core Models

- **Users**: Authentication via Clerk.dev with roles and subscriptions
- **Tools**: AI tools directory with categories, pricing, and ratings
- **Projects**: AI project showcases with embed configurations
- **Reviews**: User reviews and ratings for tools
- **ShortLinks**: Branded URL shortening with analytics
- **NewsItems**: AI industry news aggregation
- **UserInteractions**: User behavior tracking and analytics

### Key Features

- **Role-based Access Control**: Guest, Subscriber, Admin roles
- **Subscription Tiers**: Free, Basic, Pro, Enterprise
- **Polymorphic Relations**: Favorites and interactions across different entity types
- **Analytics Tracking**: Comprehensive user interaction and click tracking
- **Content Management**: Status-based publishing workflow

## Sample Data

The seed script creates:

- 2 sample users (admin and regular user)
- 4 popular AI tools (ChatGPT Plus, GitHub Copilot, Midjourney, Notion AI)
- 3 project showcases demonstrating different categories
- Sample reviews and ratings
- Short links for affiliate tracking
- System configuration settings

## Database Administration

### Using Prisma Studio

Launch the visual database browser:

```bash
npm run db:studio
```

Prisma Studio provides a user-friendly interface to:
- Browse and edit database records
- Test queries and relationships
- Manage data during development

### Making Schema Changes

1. Update `prisma/schema.prisma`
2. Generate migration: `npm run db:migrate`
3. Apply to production: `npm run db:deploy`

### Development Workflow

```bash
# During development
npm run db:push          # Quick schema sync (no migration files)

# For production deployment
npm run db:migrate       # Create migration files
npm run db:deploy        # Apply migrations to production
```

## Production Deployment

### Environment Variables

Required for production:

```env
DATABASE_URL="postgresql://user:pass@host:5432/database"
DATABASE_POOL_URL="postgresql://user:pass@host:5432/database?pgbouncer=true"
```

### Migration Strategy

1. Test migrations in staging environment
2. Backup production database
3. Run migrations during maintenance window:
   ```bash
   npm run db:deploy
   ```

### Monitoring

- Monitor query performance with Prisma metrics
- Set up database connection pooling
- Configure automated backups
- Monitor storage usage and scaling

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check PostgreSQL is running
   - Verify connection string format
   - Check firewall/network access

2. **Migration Conflicts**
   - Reset development database: `npm run db:reset`
   - Resolve schema conflicts manually
   - Create new migration: `npm run db:migrate`

3. **Seeding Errors**
   - Check unique constraints
   - Verify foreign key relationships
   - Clear database before reseeding

### Debug Commands

```bash
# Check database connection
npx prisma db pull

# Validate schema
npx prisma validate

# Reset development database
npm run db:reset

# View detailed error logs
DEBUG=prisma:* npm run db:push
```

## Security Considerations

- Use connection pooling for production
- Enable Row Level Security (RLS) policies
- Encrypt sensitive data at rest
- Regular security updates and patches
- Monitor for suspicious query patterns
- Implement proper backup and recovery procedures

For more information, see the [Prisma documentation](https://www.prisma.io/docs/) and [PostgreSQL best practices](https://www.postgresql.org/docs/current/performance-tips.html).