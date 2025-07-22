# PostHog Setup

## Installation
```bash
npm install posthog-js
```

## Initialization
Initialize PostHog in your app (e.g. `_app.tsx` or `layout.tsx`):
```ts
import posthog from 'posthog-js';
if (typeof window !== 'undefined') {
  posthog.init('PH_PROJECT_API_KEY', {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
    autocapture: true
  });
}
```

## Custom Events
Define events like `project_viewed`, `tool_launched`, `affiliate_clicked`.

## Role of PostHog
- Product analytics
- User funnel tracking
- Embedded dashboards
