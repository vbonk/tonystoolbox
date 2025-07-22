# 🤖 Automation Strategy

Automation is used for syncing content, deployments, and notifications across the site stack.

## 🔁 Sources of Automation

| Source       | Tool               | Description                          |
|--------------|--------------------|--------------------------------------|
| GitHub       | GitHub Actions     | CI/CD for schema, deploys, tests     |
| RSS Feeds    | Supabase Edge FX   | Ingest and publish blog/news items   |
| DB Triggers  | PostgreSQL Trigger | React to inserts or updates          |
| User Actions | Supabase Realtime  | Track events for analytics/logging   |

## 🔧 Examples

### GitHub Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Site

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
```
### Supabase Trigger

```sql
CREATE OR REPLACE FUNCTION notify_new_project()
RETURNS trigger AS $$
BEGIN
  -- Notify or log logic here
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
