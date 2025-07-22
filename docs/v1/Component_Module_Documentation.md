# Component & Module Documentation

## `GPTEmbedViewer.tsx`
- Displays a GPT tool or automation via iframe
- Props: `src: string`, `title: string`
- Notes: Uses `sandbox`, `loading="lazy"` for performance + security

## `NewsWall.tsx`
- Accepts array of news items
- Responsive grid with fallback handling
- ARIA role added for accessibility

## `ShortlinkRedirect.ts`
- Server-side redirect for `/go/:slug`
- Fetches destination from DB, increments click
- Rate-limited for abuse prevention

Document additional modules here as they’re added.
