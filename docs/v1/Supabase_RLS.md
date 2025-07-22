# 🔐 Supabase Row-Level Security (RLS)

Supabase Row-Level Security (RLS) enables fine-grained access control directly in the PostgreSQL layer using SQL policies.

## ✅ Key Concepts

- **Enabled per table**: RLS must be explicitly enabled using `ALTER TABLE`.
- **Policies** are SQL expressions that return a boolean.
- RLS applies to `SELECT`, `INSERT`, `UPDATE`, and `DELETE` actions independently.

## 🏗️ Common Setup

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Example policy: Allow users to read their own projects
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);
```
## 🔐 Role Mapping

You may use a `user_roles` table or claim metadata to map roles such as `admin`, `subscriber`.

## 🛡️ Best Practices

- Always test with different roles via Supabase Auth JWTs
- Use `pgjwt.verify()` for advanced claims if needed
- Prefer `USING` over `WITH CHECK` unless modifying data
