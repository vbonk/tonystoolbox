# ⚡ Performance Optimization

This site is optimized for fast load times, mobile responsiveness, and high Lighthouse scores.

## 🔍 Core Web Vitals Target

| Metric             | Target         |
|--------------------|----------------|
| LCP (Load Time)    | < 2.5s         |
| FID (Interaction)  | < 100ms        |
| CLS (Layout Shift) | < 0.1          |

## 🧪 Techniques

- **Next.js Static Rendering**: ISR + caching where possible
- **Edge Caching**: Vercel smart CDN layer
- **Lazy Loading**: Images, embeds, newsfeed blocks
- **Critical CSS**: Tailwind CSS JIT + PurgeCSS
- **Bundle Optimization**: Tree-shaking and dynamic imports

## 🧰 Tools Used

- Lighthouse
- Vercel Insights
- `next/image` for optimized responsive images
- Supabase CDN for DB/API
