# 🧠 AI Embedding & Integration Guide

This project supports integration with external AI models such as OpenAI GPT, Claude, and Gemini.

## 🎯 Use Cases

- Chat-based GPT demos
- AI-generated project descriptions
- NLP-enhanced filtering or tagging
- Summarization or content analysis via Edge Functions

## 🔌 Integration Methods

| Type        | Method                          | Notes                          |
|-------------|----------------------------------|--------------------------------|
| GPT-4       | Server-side API (OpenAI)        | Use `gpt-4` or `gpt-4o` models |
| Claude/Gemini | Proxy via secure Edge Function | Hide keys, log usage           |
| GPT iframe  | Public share embeds             | Use sandboxed iframes          |

## 🔒 API Key Security

- Never expose keys in frontend code
- Use `.env` and server/API proxies
- Track usage via logging tools (e.g., Supabase logs, Vercel Insights)

## 🧪 Example: Embed GPT Project Card

```tsx
<iframe
  src="https://chat.openai.com/g/g-mytool"
  className="w-full h-[600px] rounded-xl border shadow"
  sandbox="allow-scripts allow-same-origin"
/>
```
