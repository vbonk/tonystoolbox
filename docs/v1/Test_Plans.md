# Test Plans - Tony's Toolbox

## 🧪 Comprehensive Testing Strategy

### Testing Philosophy
Tony's Toolbox follows a comprehensive testing pyramid approach, ensuring reliability, security, and user experience quality across all platform features. Our testing strategy prioritizes user-critical paths while maintaining efficient development velocity.

---

## 🔧 Unit Tests (Foundation Layer)

### Core Utility Functions
```typescript
// lib/utils.test.ts
describe('Utility Functions', () => {
  describe('slug generation', () => {
    test('converts titles to URL-safe slugs', () => {
      expect(generateSlug('AI Tool for Content Creation!')).toBe('ai-tool-for-content-creation')
      expect(generateSlug('GPT-4 & Claude Analysis')).toBe('gpt-4-claude-analysis')
    })
    
    test('handles edge cases and special characters', () => {
      expect(generateSlug('')).toBe('')
      expect(generateSlug('   Multiple   Spaces   ')).toBe('multiple-spaces')
      expect(generateSlug('中文测试')).toBe('zhong-wen-ce-shi') // Chinese characters
    })
  })
  
  describe('link resolver', () => {
    test('resolves internal links correctly', () => {
      expect(resolveLink('/tools/gpt-4')).toBe('/tools/gpt-4')
      expect(resolveLink('https://external.com')).toBe('https://external.com')
    })
    
    test('handles affiliate link transformation', () => {
      expect(resolveAffiliateLink('chatgpt')).toBe('/go/chatgpt')
      expect(resolveAffiliateLink('midjourney')).toBe('/go/midjourney')
    })
  })
})
```

### Authentication & Authorization
```typescript
// lib/auth.test.ts
describe('Auth Helper Functions', () => {
  describe('role validation', () => {
    test('correctly identifies user roles', () => {
      expect(hasRole(mockUser, 'subscriber')).toBe(true)
      expect(hasRole(mockGuestUser, 'admin')).toBe(false)
    })
    
    test('handles role hierarchy', () => {
      expect(canAccess(mockAdminUser, 'subscriber-content')).toBe(true)
      expect(canAccess(mockSubscriber, 'admin-panel')).toBe(false)
    })
  })
})
```

### Data Processing & Validation
```typescript
// lib/validation.test.ts
describe('Data Validation', () => {
  test('validates tool submission data', () => {
    const validTool = {
      name: 'ChatGPT',
      description: 'AI chatbot for conversation',
      category: ['ai-chat', 'productivity'],
      affiliateLink: 'https://openai.com/chatgpt'
    }
    expect(validateToolData(validTool)).toBe(true)
  })
  
  test('rejects invalid tool data', () => {
    const invalidTool = { name: '', description: 'x'.repeat(5000) }
    expect(validateToolData(invalidTool)).toBe(false)
  })
})
```

---

## 🔗 Integration Tests (System Integration)

### API Route Testing
```typescript
// __tests__/api/track-click.test.ts
describe('/api/track-click', () => {
  test('successfully tracks affiliate clicks', async () => {
    const response = await request(app)
      .post('/api/track-click')
      .send({
        toolSlug: 'chatgpt',
        userId: 'test-user-id',
        referrer: 'https://tonystoolbox.com/tools'
      })
    
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    
    // Verify database record created
    const clickRecord = await supabase
      .from('clicks')
      .select('*')
      .eq('tool_slug', 'chatgpt')
      .single()
    
    expect(clickRecord.data).toBeDefined()
  })
  
  test('handles rate limiting', async () => {
    // Simulate rapid clicks from same IP
    const promises = Array(10).fill(null).map(() => 
      request(app).post('/api/track-click').send({ toolSlug: 'test' })
    )
    
    const responses = await Promise.all(promises)
    const rateLimited = responses.filter(r => r.status === 429)
    expect(rateLimited.length).toBeGreaterThan(0)
  })
})
```

### Database Integration
```typescript
// __tests__/database/rls.test.ts
describe('Row Level Security (RLS)', () => {
  test('guest users cannot access subscriber content', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_gated', true)
    
    expect(data).toHaveLength(0) // No gated content for guests
  })
  
  test('subscribers can access gated content', async () => {
    const supabaseWithAuth = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
    await supabaseWithAuth.auth.signIn({ email: 'subscriber@test.com' })
    
    const { data, error } = await supabaseWithAuth
      .from('projects')
      .select('*')
      .eq('is_gated', true)
    
    expect(data.length).toBeGreaterThan(0)
  })
  
  test('admin users can access all content', async () => {
    const supabaseWithAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    
    const { data: allProjects } = await supabaseWithAdmin
      .from('projects')
      .select('*')
    
    const { data: gatedProjects } = await supabaseWithAdmin
      .from('projects')
      .select('*')
      .eq('is_gated', true)
    
    expect(allProjects.length).toBeGreaterThan(gatedProjects.length)
  })
})
```

### External Service Integration
```typescript
// __tests__/services/rss.test.ts
describe('RSS Feed Processing', () => {
  test('successfully parses AI news feeds', async () => {
    const feedUrl = 'https://feeds.feedburner.com/venturebeat/AIXR'
    const articles = await parseRSSFeed(feedUrl)
    
    expect(articles).toBeInstanceOf(Array)
    expect(articles[0]).toHaveProperty('title')
    expect(articles[0]).toHaveProperty('link')
    expect(articles[0]).toHaveProperty('publishedAt')
  })
  
  test('handles feed parsing errors gracefully', async () => {
    const invalidFeedUrl = 'https://invalid-feed-url.com/rss'
    const articles = await parseRSSFeed(invalidFeedUrl)
    
    expect(articles).toEqual([])
  })
  
  test('caches feed results appropriately', async () => {
    const feedUrl = 'https://test-feed.com/rss'
    
    const firstCall = await parseRSSFeed(feedUrl)
    const secondCall = await parseRSSFeed(feedUrl)
    
    // Second call should be faster (cached)
    expect(firstCall).toEqual(secondCall)
  })
})
```

---

## 🎭 End-to-End Tests (User Journey Validation)

### Critical User Flows

#### User Registration & Gated Access Flow
```typescript
// e2e/auth-flow.spec.ts
test('visitor can sign up and access gated content', async ({ page }) => {
  // Navigate to gated project
  await page.goto('/projects/ai-content-strategy')
  
  // Verify gated content prompt appears
  await expect(page.locator('[data-testid="auth-gate"]')).toBeVisible()
  await expect(page.locator('text=Sign up to view full project')).toBeVisible()
  
  // Click sign up button
  await page.click('[data-testid="signup-button"]')
  
  // Fill registration form
  await page.fill('[data-testid="email-input"]', 'test@example.com')
  await page.fill('[data-testid="password-input"]', 'securePassword123')
  await page.click('[data-testid="register-submit"]')
  
  // Verify successful registration and content access
  await expect(page.locator('[data-testid="project-content"]')).toBeVisible()
  await expect(page.locator('[data-testid="auth-gate"]')).not.toBeVisible()
  
  // Verify user role assignment
  const userRole = await page.locator('[data-testid="user-role"]').textContent()
  expect(userRole).toBe('subscriber')
})
```

#### Tool Discovery & Affiliate Click Flow
```typescript
// e2e/tool-discovery.spec.ts
test('user can discover and click tools', async ({ page }) => {
  // Navigate to tools directory
  await page.goto('/tools')
  
  // Verify tools are loaded
  await expect(page.locator('[data-testid="tool-grid"]')).toBeVisible()
  
  // Filter by category
  await page.click('[data-testid="category-filter-ai-writing"]')
  await expect(page.locator('[data-testid="tool-card"]')).toHaveCount(5) // Assuming 5 AI writing tools
  
  // Click on a specific tool
  await page.click('[data-testid="tool-chatgpt"]')
  
  // Verify tool detail page
  await expect(page.locator('[data-testid="tool-title"]')).toContainText('ChatGPT')
  await expect(page.locator('[data-testid="tool-description"]')).toBeVisible()
  
  // Click affiliate link
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('[data-testid="try-tool-button"]')
  ])
  
  // Verify redirect to external tool
  await expect(newPage).toHaveURL(/openai.com/)
  
  // Verify click tracking (check analytics endpoint)
  const clickEvents = await page.evaluate(() => 
    window.analytics?.getEvents?.() || []
  )
  expect(clickEvents.some(e => e.event === 'tool_click')).toBe(true)
})
```

#### Admin Tool Management Flow
```typescript
// e2e/admin-flow.spec.ts
test('admin can create and manage tools', async ({ page }) => {
  // Login as admin
  await page.goto('/login')
  await page.fill('[data-testid="email"]', 'admin@tonystoolbox.com')
  await page.fill('[data-testid="password"]', 'adminPassword123')
  await page.click('[data-testid="login-button"]')
  
  // Navigate to admin dashboard
  await page.goto('/admin')
  await expect(page.locator('[data-testid="admin-dashboard"]')).toBeVisible()
  
  // Create new tool
  await page.click('[data-testid="add-tool-button"]')
  await page.fill('[data-testid="tool-name"]', 'New AI Tool')
  await page.fill('[data-testid="tool-description"]', 'Description of the new AI tool')
  await page.selectOption('[data-testid="tool-category"]', 'ai-productivity')
  await page.fill('[data-testid="affiliate-link"]', 'https://newtool.com/?ref=tonystoolbox')
  
  await page.click('[data-testid="save-tool"]')
  
  // Verify tool appears in public directory
  await page.goto('/tools')
  await expect(page.locator('text=New AI Tool')).toBeVisible()
})
```

---

## 📊 Performance Testing

### Load Testing
```typescript
// performance/load-test.js
import { check } from 'k6'
import http from 'k6/http'

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
}

export default function() {
  // Test homepage performance
  let response = http.get('https://tonystoolbox.com')
  check(response, {
    'homepage loads in <2s': (r) => r.timings.duration < 2000,
    'homepage returns 200': (r) => r.status === 200,
  })
  
  // Test tools directory performance
  response = http.get('https://tonystoolbox.com/tools')
  check(response, {
    'tools page loads in <3s': (r) => r.timings.duration < 3000,
    'tools page returns 200': (r) => r.status === 200,
  })
  
  // Test API endpoint performance
  response = http.post('https://tonystoolbox.com/api/track-click', {
    toolSlug: 'chatgpt',
    referrer: 'https://tonystoolbox.com/tools'
  })
  check(response, {
    'API responds in <500ms': (r) => r.timings.duration < 500,
    'API returns success': (r) => r.status === 200,
  })
}
```

---

## 🔒 Security Testing

### Authentication Security
```typescript
// security/auth-security.test.ts
describe('Authentication Security', () => {
  test('prevents SQL injection in login', async () => {
    const maliciousPayload = {
      email: "admin@test.com'; DROP TABLE users; --",
      password: 'anything'
    }
    
    const response = await request(app)
      .post('/api/auth/login')
      .send(maliciousPayload)
    
    expect(response.status).toBe(400) // Bad request, not server error
    
    // Verify users table still exists
    const { data } = await supabase.from('users').select('count', { count: 'exact' })
    expect(data).toBeDefined()
  })
  
  test('rate limits login attempts', async () => {
    const loginAttempts = Array(10).fill(null).map(() => 
      request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrong' })
    )
    
    const responses = await Promise.all(loginAttempts)
    const rateLimited = responses.filter(r => r.status === 429)
    expect(rateLimited.length).toBeGreaterThan(0)
  })
})
```

### API Security
```typescript
// security/api-security.test.ts
describe('API Security', () => {
  test('validates CORS headers', async () => {
    const response = await request(app)
      .options('/api/tools')
      .set('Origin', 'https://malicious-site.com')
    
    expect(response.headers['access-control-allow-origin']).not.toBe('*')
  })
  
  test('sanitizes user input', async () => {
    const xssPayload = {
      name: '<script>alert("XSS")</script>',
      description: '<img src=x onerror=alert("XSS")>'
    }
    
    const response = await request(app)
      .post('/api/tools')
      .send(xssPayload)
      .set('Authorization', 'Bearer ' + adminToken)
    
    expect(response.body.name).not.toContain('<script>')
    expect(response.body.description).not.toContain('<img')
  })
})
```

---

## 🚀 Test Automation & CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
  
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:integration
  
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
```

### Testing Tools & Configuration

**Primary Testing Stack:**
- **Jest** - Unit and integration testing framework
- **Playwright** - End-to-end browser testing
- **Supertest** - HTTP assertion testing for APIs
- **K6** - Performance and load testing
- **ESLint + Prettier** - Code quality and formatting

**Configuration Files:**
- `jest.config.js` - Jest configuration with coverage thresholds
- `playwright.config.ts` - E2E test configuration
- `.eslintrc.js` - Linting rules and security plugins
- `coverage.config.js` - Coverage reporting setup

**Coverage Targets:**
- **Unit Tests:** >90% code coverage
- **Integration Tests:** All API endpoints covered
- **E2E Tests:** All critical user journeys covered
- **Performance Tests:** <2s load time for critical paths

---

## 📊 Quality Metrics & Monitoring

### Test Quality Indicators
- **Test Coverage:** Minimum 90% for business logic
- **Test Execution Time:** <5 minutes for full suite
- **Flaky Test Rate:** <2% of total tests
- **Bug Escape Rate:** <1% of bugs reach production

### Continuous Monitoring
- **Automated Test Runs:** Every commit and nightly
- **Performance Regression Testing:** Weekly baseline comparisons
- **Security Vulnerability Scanning:** Daily dependency checks
- **Accessibility Testing:** Automated a11y audits on each deployment

This comprehensive test plan ensures Tony's Toolbox maintains high quality, security, and performance standards while enabling confident, rapid development and deployment.