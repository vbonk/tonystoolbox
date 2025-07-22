# ⚡ Supabase Edge Functions & Realtime Triggers

Edge Functions let you run custom TypeScript logic close to the database with near-zero latency.

## 🚀 Edge Function Basics

- Written in Deno (TypeScript)
- Deploy with `supabase functions deploy`
- Triggered via HTTP calls, webhook events, or database changes

## 📦 Common Use Cases

- Transform RSS feeds and auto-publish content
- Send Slack/email/Discord notifications
- Proxy secure API requests (e.g., GPT, Claude)

## ✨ Example: RSS Parser Function

```ts
// functions/rss-ingest/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { feedUrl } = await req.json();
  // fetch and parse RSS, store in DB
  return new Response("Ingested");
});
```
## 🔄 Realtime Triggers

You can pair functions with `supabase_realtime` or DB triggers:

```sql
CREATE TRIGGER on_project_insert
AFTER INSERT ON projects
FOR EACH ROW
EXECUTE FUNCTION notify_new_project();
```
