# 🔐 Data Privacy & Compliance

This project is designed to meet common data protection and privacy standards, including GDPR and CCPA.

## 📜 Disclosures

- Privacy Policy and Terms of Use hosted at:
  - `/privacy-policy`
  - `/terms-of-use`
- Explicit opt-in for newsletter or gated content
- Consent banner for cookies/analytics (if applicable)

## 🔐 Data Handling

- **Storage**: Supabase with encrypted-at-rest Postgres
- **Transmission**: All traffic encrypted via HTTPS
- **Access Control**: Role-based via Supabase RLS and JWT
- **Third-Party Services**: Vercel, Resend/Postmark (email), GPT APIs

## ✅ User Rights (GDPR)

- Right to access
- Right to deletion ("Forget me")
- Export on request
- Session expiration and logout controls

## 🛡️ Safeguards

- Row-level security
- Audit logs via Supabase
- Token/session expiration policy
- Data minimization & retention enforcement
