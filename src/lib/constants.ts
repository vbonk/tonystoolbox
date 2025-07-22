/**
 * Application-wide constants for Tony's Toolbox
 */

// Application metadata
export const APP_NAME = "Tony's Toolbox"
export const APP_DESCRIPTION =
  'Professional AI tool showcase platform with analytics and subscription management'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://tonystoolbox.com'

// User roles
export const USER_ROLES = {
  GUEST: 'guest',
  SUBSCRIBER: 'subscriber',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// Project categories
export const PROJECT_CATEGORIES = [
  { id: 'ai-tools', name: 'AI Tools', icon: '🤖', slug: 'ai-tools' },
  { id: 'automation', name: 'Automation', icon: '⚡', slug: 'automation' },
  { id: 'productivity', name: 'Productivity', icon: '📊', slug: 'productivity' },
  { id: 'marketing', name: 'Marketing', icon: '📈', slug: 'marketing' },
  { id: 'development', name: 'Development', icon: '💻', slug: 'development' },
  { id: 'design', name: 'Design', icon: '🎨', slug: 'design' },
] as const

// Analytics event names
export const ANALYTICS_EVENTS = {
  PROJECT_VIEWED: 'project_viewed',
  TOOL_LAUNCHED: 'tool_launched',
  AFFILIATE_CLICKED: 'affiliate_clicked',
  NEWSLETTER_SUBSCRIBED: 'newsletter_subscribed',
  SEARCH_PERFORMED: 'search_performed',
  CATEGORY_FILTERED: 'category_filtered',
  USER_REGISTERED: 'user_registered',
  SUBSCRIPTION_UPGRADED: 'subscription_upgraded',
} as const

// Route paths
export const ROUTES = {
  HOME: '/',
  TOOLS: '/tools',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  CATEGORY: (slug: string) => `/category/${slug}`,
  ADMIN: '/admin',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_PROJECTS: '/admin/projects',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  API: {
    PROJECTS: '/api/projects',
    ANALYTICS: '/api/analytics',
    SHORTLINKS: '/api/shortlinks',
    AUTH: '/api/auth',
  },
} as const

// UI configuration
export const UI_CONFIG = {
  MAX_CONTENT_WIDTH: '1200px',
  MOBILE_BREAKPOINT: 640,
  TABLET_BREAKPOINT: 1024,
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
  ANIMATION_DURATION: 150,
} as const

// Feature flags (can be overridden by PostHog)
export const FEATURES = {
  DARK_MODE: true,
  NEWSLETTER_SIGNUP: true,
  ANALYTICS_TRACKING: true,
  USER_REGISTRATION: true,
  SUBSCRIPTION_GATING: true,
  ADMIN_DASHBOARD: true,
  SEARCH_FUNCTIONALITY: true,
} as const

// External service URLs
export const EXTERNAL_URLS = {
  POSTHOG: 'https://app.posthog.com',
  SUPABASE: process.env.NEXT_PUBLIC_SUPABASE_URL,
  GITHUB: 'https://github.com/tonystoolbox',
  TWITTER: 'https://twitter.com/tonystoolbox',
  LINKEDIN: 'https://linkedin.com/company/tonystoolbox',
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to access this feature.',
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SUBSCRIPTION_UPDATED: 'Subscription updated successfully!',
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!',
} as const

// Validation rules
export const VALIDATION = {
  PROJECT_TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  },
  PROJECT_DESCRIPTION: {
    MAX_LENGTH: 1000,
  },
  PROJECT_SLUG: {
    PATTERN: /^[a-z0-9-]+$/,
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const
