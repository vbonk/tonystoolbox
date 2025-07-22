# 📘 Database Schema Reference

A full breakdown of tables, relationships, and purpose in the `tonystoolbox` schema.

## 📁 Tables

### `projects`

| Column     | Type     | Description                        |
|------------|----------|------------------------------------|
| id         | UUID     | Primary key                        |
| title      | TEXT     | Project name                       |
| slug       | TEXT     | URL-friendly slug                  |
| description| TEXT     | Project summary                    |
| category   | TEXT     | FK to `project_categories.slug`    |
| tags       | TEXT[]   | Array of keyword tags              |
| gated      | BOOLEAN  | Whether project is gated           |

### `project_categories`

| Column | Type | Description          |
|--------|------|----------------------|
| slug   | TEXT | Unique category slug |
| name   | TEXT | Display name         |

### `user_roles`

| Column  | Type  | Description        |
|---------|-------|--------------------|
| user_id | UUID  | FK to auth.users   |
| role    | TEXT  | `guest`, `subscriber`, `admin` |

## 🔁 Relationships

- `projects.category` → `project_categories.slug`
- `user_roles.user_id` → `auth.users.id`
