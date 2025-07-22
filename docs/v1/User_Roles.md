# 👤 User Roles & Access Strategy

This system uses Supabase Auth and PostgreSQL RLS (Row-Level Security) to control user access based on roles.

## 🔑 Roles Overview

| Role       | Description                             |
|------------|-----------------------------------------|
| guest      | Unauthenticated visitor                 |
| subscriber | Verified user with access to gated tools|
| admin      | Full backend access                     |

## 🗃️ Role Storage

Roles are stored in a `user_roles` table or embedded in JWT via Supabase Auth claims.

```sql
CREATE TABLE user_roles (
  user_id UUID PRIMARY KEY,
  role TEXT CHECK (role IN ('guest', 'subscriber', 'admin'))
);
```
## 🔒 Policy Example: Subscriber Access

```sql
CREATE POLICY "Subscribers can access tools"
  ON tools FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'subscriber'
    )
  );
```
## 🚀 Admin Dashboard Access

Admin access is enforced in Supabase via RLS and on the frontend with `useUser()` checks.
