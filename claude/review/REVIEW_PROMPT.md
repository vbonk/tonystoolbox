# Claude Code Review Prompt – Tony's Toolbox

You are a senior-level software architecture and security advisor. I am submitting a complete project called **Tony’s Toolbox**, including the current app structure, documentation, database schema, and UI code.

Please conduct a **comprehensive architecture and implementation review** of the application to ensure it is:

- ✅ Well-structured and scalable
- ✅ Secure and privacy-respecting
- ✅ Following modern best practices (e.g., performance, DX, maintainability)
- ✅ Backed by a logically sound and normalized database schema
- ✅ Well-aligned with the goals described in `docs/strategy.md`

---

## 🔍 Focus Areas

### 1. Project Architecture
- Does the overall structure of frontend/backend logic, routing, and authentication make sense?
- Are Supabase + PostHog + Google Analytics used effectively and securely?
- Are the UI components cleanly separated and reusable?

### 2. Authentication & Role Access
- Are `admin`, `subscriber`, and `guest` roles handled correctly?
- Are row-level security (RLS) and user-specific access controls well-designed?

### 3. Supabase Schema & SQL Design
- Review the `projects`, `categories`, `tags`, and shortlink tables and many-to-many relationships
- Is the schema normalized and performant? Any improvements to structure or indexing?
- Are triggers or constraints missing that would help with data integrity?

### 4. Security
- Are secrets (e.g., API keys, Supabase creds) protected properly?
- Are there any potential issues with unprotected endpoints, XSS, or auth bypass?
- Is API proxying handled securely for GPTs or tools using external keys?

### 5. CI/CD & Observability
- Review the GitHub workflow and PostHog setup
- Are there missing tests, alerts, or logs that should be added?

### 6. Analytics & Monetization
- Is affiliate tracking handled correctly?
- Can conversion attribution (click → signup → revenue) be improved?
- Do you recommend A/B testing or user journey enhancements?

---

## 🧾 Submission Package

I have placed this prompt and a few additional files here:  /Users/tony/Projects/tonystoolbox/claude/review


✅ Please review everything, then provide:

- A prioritized list of **recommendations or red flags**
- Specific rationale and guidance (e.g., "normalize this", "add this RLS", "refactor here")
- Optional enhancements for scale, reliability, or monetization
