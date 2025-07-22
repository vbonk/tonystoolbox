# Use Case Matrix

| Use Case | Actor | Preconditions | Flow | Postconditions |
|----------|-------|---------------|------|----------------|
| View GPT Project | Visitor | Public access | Browse /projects, click item | Project details + embedded demo |
| Subscribe to Gated Content | Visitor | Email & auth flow via Supabase Auth | Sign up, confirm email, login | Gains role: subscriber |
| Track Affiliate Click | Visitor | Click on cloaked shortlink | Redirect via /go/tool | Click tracked in DB |
| Read AI Newsfeed | Visitor | Page loads RSS | News items rendered | Real-time feed or fallback cached |
| Add Tool to Directory | Admin | Logged in, valid metadata | Submit via admin panel | Tool listed + tracked |
