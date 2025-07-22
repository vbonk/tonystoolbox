# 🔌 API Gateway & Secure Endpoints

This system supports both client and server-side API interaction.

## 📡 Strategy

- Use Supabase client SDK for public reads/writes with RLS protection
- Use Edge Functions for sensitive or rate-limited API calls (e.g. GPT, RSS)
- Secure API proxies server-side to hide API keys

## 🧱 API Proxy Pattern

```ts
// /pages/api/gpt-proxy.ts
export default async function handler(req, res) {
  const { prompt } = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: prompt }] })
  });
  const data = await response.json();
  res.status(200).json(data);
}
```
## 🔒 Secure Key Storage

- Store API keys as env vars in Vercel and Supabase (functions)
- Do not expose secrets in client-side JS
