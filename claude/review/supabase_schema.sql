
-- Projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  embed_url text,
  is_gated boolean default false,
  version text,
  status text default 'published',
  created_by uuid references auth.users(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Categories table
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  icon text
);

-- Tags table
create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

-- Project → Category (many-to-many)
create table project_categories (
  project_id uuid references projects(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (project_id, category_id)
);

-- Project → Tags (many-to-many)
create table project_tags (
  project_id uuid references projects(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

-- Shortlinks table for affiliate tracking
create table shortlinks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  destination text not null,
  project_id uuid references projects(id),
  click_count integer default 0,
  created_at timestamp default now()
);

-- Usage tracking table (per user/tool)
create table usage_tracker (
  user_id uuid references auth.users(id),
  project_id uuid references projects(id),
  launch_count integer default 0,
  last_used timestamp,
  primary key (user_id, project_id)
);

-- RLS and role metadata will be added in Supabase UI or follow-up SQL
