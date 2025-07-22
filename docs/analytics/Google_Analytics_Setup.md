# Google Analytics Setup

## GA4 Installation
Place in your layout or `_app.tsx`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

## Goals & Events
Set up conversions for:
- Signups
- Newsletter submits
- Affiliate clicks

## Role of GA4
- Top of funnel traffic
- SEO performance
- Basic user behavior
