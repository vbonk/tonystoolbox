# Test Plans

## Unit Tests
- Test utility functions (slug generation, link resolver)
- Validate SQL-based RLS policy using `auth.uid()` or joined roless and redirects

## Integration Tests
- Test `track-click` API route
- Test RSS feed parsing + caching
- Validate MDX rendering for blog posts

## End-to-End
- User flow: visitor → sign-up → gated access
- Admin: login → tool creation → public listing

Tooling (suggested):
- `jest` for unit tests
- `playwright` or `cypress` for E2E