# PostHog Setup & Configuration - Tony's Toolbox

This document provides comprehensive setup instructions for PostHog analytics integration in Tony's Toolbox, including advanced configuration, privacy compliance, custom event tracking, and best practices for product analytics.

## 📦 Installation & Dependencies

### Package Installation

```bash
# Core PostHog package
npm install posthog-js

# Additional packages for React integration
npm install posthog-react

# Development dependencies for type safety
npm install --save-dev @types/posthog-js
```

### Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com  # EU hosting for GDPR compliance
POSTHOG_PERSONAL_API_KEY=your_personal_api_key   # For server-side operations

# Environment-specific keys
NEXT_PUBLIC_POSTHOG_KEY_DEV=dev_project_key
NEXT_PUBLIC_POSTHOG_KEY_STAGING=staging_project_key
NEXT_PUBLIC_POSTHOG_KEY_PROD=prod_project_key
```

## ⚙️ Advanced Configuration

### Client-Side Initialization

```typescript
// lib/analytics/posthog.ts
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-react';

interface PostHogConfig {
  apiKey: string;
  apiHost: string;
  environment: 'development' | 'staging' | 'production';
  userId?: string;
  userProperties?: Record<string, any>;
}

class PostHogManager {
  private static instance: PostHogManager;
  private initialized = false;
  private config: PostHogConfig;

  constructor(config: PostHogConfig) {
    this.config = config;
  }

  static getInstance(config?: PostHogConfig): PostHogManager {
    if (!PostHogManager.instance && config) {
      PostHogManager.instance = new PostHogManager(config);
    }
    return PostHogManager.instance;
  }

  initialize(): void {
    if (typeof window === 'undefined' || this.initialized) {
      return;
    }

    const posthogConfig = {
      api_host: this.config.apiHost,
      
      // Privacy and compliance settings
      respect_dnt: true,
      opt_out_capturing_by_default: true,
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      
      // Performance settings
      batch_request_timeout_ms: 5000,
      request_batching: true,
      
      // Privacy settings for GDPR compliance
      persistence: 'localStorage+cookie',
      persistence_name: 'tonystoolbox_ph',
      cross_subdomain_cookie: false,
      secure_cookie: process.env.NODE_ENV === 'production',
      
      // Disable features that might impact privacy
      session_recording: {
        maskAllInputs: true,
        maskAllText: false,
        recordCrossOriginIframes: false
      },
      
      // Feature flags and experiments
      bootstrap: {
        featureFlags: {},
        distinctId: this.config.userId
      },
      
      // Development settings
      debug: this.config.environment === 'development',
      
      // Custom configuration for Tony's Toolbox
      property_blacklist: ['$initial_referrer', '$initial_referring_domain'],
      sanitize_properties: (properties: any, event: string) => {
        // Remove sensitive data
        const sanitized = { ...properties };
        delete sanitized.password;
        delete sanitized.email;
        delete sanitized.personal_info;
        return sanitized;
      }
    };

    posthog.init(this.config.apiKey, posthogConfig);
    
    // Set user properties if provided
    if (this.config.userId) {
      this.identifyUser(this.config.userId, this.config.userProperties);
    }

    this.initialized = true;
  }

  identifyUser(userId: string, properties?: Record<string, any>): void {
    if (!this.initialized) return;
    
    posthog.identify(userId, {
      ...properties,
      platform: 'web',
      app_version: process.env.NEXT_PUBLIC_APP_VERSION,
      environment: this.config.environment
    });
  }

  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (!this.initialized) return;
    
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      session_id: posthog.get_session_id(),
      environment: this.config.environment
    });
  }

  enableCapturing(): void {
    if (!this.initialized) return;
    posthog.opt_in_capturing();
  }

  disableCapturing(): void {
    if (!this.initialized) return;
    posthog.opt_out_capturing();
  }
}

// Initialize PostHog manager
export const initializePostHog = () => {
  const config: PostHogConfig = {
    apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
    apiHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
    environment: (process.env.NODE_ENV as any) || 'development'
  };

  return PostHogManager.getInstance(config);
};
```

### Next.js App Integration

```typescript
// app/layout.tsx (App Router)
import { PostHogProvider } from 'posthog-react';
import { initializePostHog } from '@/lib/analytics/posthog';
import { PostHogConsentManager } from '@/components/analytics/ConsentManager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posthogManager = initializePostHog();

  return (
    <html lang="en">
      <body>
        <PostHogProvider client={posthog}>
          <PostHogConsentManager onConsentChange={(granted) => {
            if (granted) {
              posthogManager.enableCapturing();
            } else {
              posthogManager.disableCapturing();
            }
          }}>
            {children}
          </PostHogConsentManager>
        </PostHogProvider>
      </body>
    </html>
  );
}
```

### Server-Side Configuration

```typescript
// lib/analytics/posthog-server.ts
import { PostHog } from 'posthog-node';

class PostHogServerManager {
  private client: PostHog;
  private static instance: PostHogServerManager;

  constructor() {
    this.client = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        flushAt: 20,
        flushInterval: 10000,
        personalApiKey: process.env.POSTHOG_PERSONAL_API_KEY
      }
    );
  }

  static getInstance(): PostHogServerManager {
    if (!PostHogServerManager.instance) {
      PostHogServerManager.instance = new PostHogServerManager();
    }
    return PostHogServerManager.instance;
  }

  async captureServerEvent(
    distinctId: string,
    event: string,
    properties?: Record<string, any>
  ): Promise<void> {
    this.client.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        $lib: 'server',
        server_timestamp: new Date().toISOString()
      }
    });
  }

  async identifyServerUser(
    distinctId: string,
    properties: Record<string, any>
  ): Promise<void> {
    this.client.identify({
      distinctId,
      properties
    });
  }

  async shutdown(): Promise<void> {
    await this.client.shutdown();
  }
}

export const posthogServer = PostHogServerManager.getInstance();
```

## 🎯 Custom Event Tracking

### Event Schema Definition

```typescript
// types/analytics.ts
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: string;
}

// Predefined event types for Tony's Toolbox
export const POSTHOG_EVENTS = {
  // User Journey Events
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in',
  USER_ONBOARDED: 'user_onboarded',
  
  // Tool Discovery Events
  TOOL_SEARCHED: 'tool_searched',
  TOOL_VIEWED: 'tool_viewed',
  TOOL_CLICKED: 'tool_clicked',
  TOOL_BOOKMARKED: 'tool_bookmarked',
  TOOL_SHARED: 'tool_shared',
  
  // AI Feature Events
  AI_RECOMMENDATION_SHOWN: 'ai_recommendation_shown',
  AI_RECOMMENDATION_CLICKED: 'ai_recommendation_clicked',
  GPT_EMBED_LOADED: 'gpt_embed_loaded',
  GPT_EMBED_INTERACTED: 'gpt_embed_interacted',
  
  // Content Events
  NEWS_ARTICLE_VIEWED: 'news_article_viewed',
  NEWS_ARTICLE_CLICKED: 'news_article_clicked',
  NEWSLETTER_SUBSCRIBED: 'newsletter_subscribed',
  
  // Conversion Events
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_COMPLETED: 'subscription_completed',
  UPGRADE_PROMPTED: 'upgrade_prompted',
  UPGRADE_COMPLETED: 'upgrade_completed',
  
  // Feature Usage Events
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
  SORT_CHANGED: 'sort_changed',
  PAGINATION_CLICKED: 'pagination_clicked',
  
  // Error and Performance Events
  ERROR_ENCOUNTERED: 'error_encountered',
  PAGE_LOAD_SLOW: 'page_load_slow',
  API_REQUEST_FAILED: 'api_request_failed'
} as const;
```

### Event Tracking Utilities

```typescript
// hooks/useAnalytics.ts
import { usePostHog } from 'posthog-react';
import { AnalyticsEvent, POSTHOG_EVENTS } from '@/types/analytics';

export const useAnalytics = () => {
  const posthog = usePostHog();

  const trackEvent = (event: AnalyticsEvent) => {
    if (!posthog) return;
    
    posthog.capture(event.name, {
      ...event.properties,
      timestamp: event.timestamp || new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight
    });
  };

  const trackToolInteraction = (
    toolId: string,
    action: 'viewed' | 'clicked' | 'bookmarked' | 'shared',
    metadata?: Record<string, any>
  ) => {
    const eventMap = {
      viewed: POSTHOG_EVENTS.TOOL_VIEWED,
      clicked: POSTHOG_EVENTS.TOOL_CLICKED,
      bookmarked: POSTHOG_EVENTS.TOOL_BOOKMARKED,
      shared: POSTHOG_EVENTS.TOOL_SHARED
    };

    trackEvent({
      name: eventMap[action],
      properties: {
        tool_id: toolId,
        action,
        ...metadata
      }
    });
  };

  const trackSearchInteraction = (
    query: string,
    resultsCount: number,
    filters?: Record<string, any>
  ) => {
    trackEvent({
      name: POSTHOG_EVENTS.SEARCH_PERFORMED,
      properties: {
        search_query: query,
        results_count: resultsCount,
        query_length: query.length,
        has_filters: !!filters && Object.keys(filters).length > 0,
        applied_filters: filters
      }
    });
  };

  const trackConversion = (
    conversionType: string,
    value?: number,
    metadata?: Record<string, any>
  ) => {
    trackEvent({
      name: POSTHOG_EVENTS.SUBSCRIPTION_COMPLETED,
      properties: {
        conversion_type: conversionType,
        conversion_value: value,
        currency: 'USD',
        ...metadata
      }
    });
  };

  return {
    trackEvent,
    trackToolInteraction,
    trackSearchInteraction,
    trackConversion,
    posthog
  };
};
```

### Automated Event Tracking

```typescript
// components/analytics/AutoTracker.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAnalytics } from '@/hooks/useAnalytics';

export const AutoTracker = () => {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      trackEvent({
        name: 'page_viewed',
        properties: {
          page_url: url,
          page_title: document.title,
          referrer: document.referrer
        }
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackEvent]);

  useEffect(() => {
    // Track performance metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          trackEvent({
            name: 'page_performance',
            properties: {
              load_time: navEntry.loadEventEnd - navEntry.loadEventStart,
              dom_content_loaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
              page_url: window.location.href
            }
          });
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
    
    return () => observer.disconnect();
  }, [trackEvent]);

  return null;
};
```

## 🔐 Privacy & Consent Management

### GDPR Compliance Setup

```typescript
// components/analytics/ConsentManager.tsx
import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-react';

interface ConsentPreferences {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export const PostHogConsentManager = ({ 
  onConsentChange,
  children 
}: {
  onConsentChange: (granted: boolean) => void;
  children: React.ReactNode;
}) => {
  const posthog = usePostHog();
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState<ConsentPreferences>({
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already provided consent
    const savedConsent = localStorage.getItem('tonystoolbox_analytics_consent');
    
    if (!savedConsent) {
      setShowConsentBanner(true);
    } else {
      const consent = JSON.parse(savedConsent);
      setConsentPreferences(consent);
      
      if (consent.analytics || consent.functional) {
        posthog?.opt_in_capturing();
        onConsentChange(true);
      }
    }
  }, [posthog, onConsentChange]);

  const handleConsentUpdate = (preferences: ConsentPreferences) => {
    setConsentPreferences(preferences);
    localStorage.setItem('tonystoolbox_analytics_consent', JSON.stringify(preferences));
    setShowConsentBanner(false);

    // Configure PostHog based on consent
    if (preferences.analytics || preferences.functional) {
      posthog?.opt_in_capturing();
      posthog?.set_config({
        persistence: preferences.functional ? 'localStorage+cookie' : 'memory',
        disable_session_recording: !preferences.functional
      });
      onConsentChange(true);
    } else {
      posthog?.opt_out_capturing();
      onConsentChange(false);
    }

    // Track consent decision
    posthog?.capture('consent_updated', {
      analytics_consent: preferences.analytics,
      functional_consent: preferences.functional,
      marketing_consent: preferences.marketing
    });
  };

  return (
    <>
      {children}
      {showConsentBanner && (
        <ConsentBanner
          onAcceptAll={() => handleConsentUpdate({
            analytics: true,
            functional: true,
            marketing: true
          })}
          onRejectAll={() => handleConsentUpdate({
            analytics: false,
            functional: false,
            marketing: false
          })}
          onCustomize={(preferences) => handleConsentUpdate(preferences)}
        />
      )}
    </>
  );
};
```

## 📊 Advanced Analytics Features

### Feature Flags Integration

```typescript
// hooks/useFeatureFlag.ts
import { usePostHog } from 'posthog-react';
import { useEffect, useState } from 'react';

export const useFeatureFlag = (flagKey: string, defaultValue = false) => {
  const posthog = usePostHog();
  const [flagValue, setFlagValue] = useState(defaultValue);

  useEffect(() => {
    if (posthog) {
      const value = posthog.getFeatureFlag(flagKey);
      setFlagValue(value === true);
      
      // Track feature flag exposure
      posthog.capture('feature_flag_called', {
        flag_key: flagKey,
        flag_value: value,
        default_value: defaultValue
      });
    }
  }, [posthog, flagKey, defaultValue]);

  return flagValue;
};

// Usage example
export const ToolRecommendations = () => {
  const showAIRecommendations = useFeatureFlag('ai_recommendations_enabled');
  
  return (
    <div>
      {showAIRecommendations ? (
        <AIRecommendationPanel />
      ) : (
        <StandardRecommendationPanel />
      )}
    </div>
  );
};
```

### Cohort Analysis Setup

```typescript
// lib/analytics/cohorts.ts
export const COHORT_DEFINITIONS = {
  NEW_USERS: {
    name: 'New Users',
    filters: [
      {
        key: 'days_since_signup',
        operator: 'lte',
        value: 7
      }
    ]
  },
  POWER_USERS: {
    name: 'Power Users',
    filters: [
      {
        key: 'tool_searches_count',
        operator: 'gte',
        value: 10
      },
      {
        key: 'days_since_signup',
        operator: 'gte',
        value: 30
      }
    ]
  },
  AT_RISK_USERS: {
    name: 'At Risk Users',
    filters: [
      {
        key: 'days_since_last_activity',
        operator: 'gte',
        value: 14
      },
      {
        key: 'total_sessions',
        operator: 'gte',
        value: 3
      }
    ]
  }
};

export const trackCohortEvent = (userId: string, cohortName: string, eventName: string) => {
  posthog.capture(eventName, {
    user_id: userId,
    cohort: cohortName,
    cohort_timestamp: new Date().toISOString()
  });
};
```

## 🎯 Implementation Checklist

### Phase 1: Basic Setup ✅
- [x] Install PostHog packages
- [x] Configure environment variables
- [x] Set up client-side initialization
- [x] Implement basic event tracking

### Phase 2: Privacy Compliance 🔄
- [x] GDPR consent management
- [x] Data anonymization
- [x] Cookie policy integration
- [ ] Regular privacy audits

### Phase 3: Advanced Features ⏳
- [ ] Feature flags implementation
- [ ] A/B testing setup
- [ ] Cohort analysis
- [ ] Custom dashboards

### Phase 4: Optimization 🔮
- [ ] Performance monitoring
- [ ] Event optimization
- [ ] Advanced segmentation
- [ ] Predictive analytics

## 🔧 Troubleshooting

### Common Issues

**PostHog not initializing:**
```typescript
// Debug initialization
if (typeof window !== 'undefined') {
  console.log('PostHog key:', process.env.NEXT_PUBLIC_POSTHOG_KEY);
  console.log('PostHog host:', process.env.NEXT_PUBLIC_POSTHOG_HOST);
}
```

**Events not appearing:**
```typescript
// Force flush events
posthog.flush();

// Check if user has opted out
console.log('Opted out:', posthog.has_opted_out_capturing());
```

**CORS issues:**
```typescript
// Ensure correct API host for EU compliance
const config = {
  api_host: 'https://eu.posthog.com', // Use EU endpoint
  cross_subdomain_cookie: false
};
```

## 📈 Performance Optimization

### Lazy Loading
```typescript
// Lazy load PostHog for better performance
const loadPostHog = async () => {
  const { default: posthog } = await import('posthog-js');
  return posthog;
};
```

### Event Batching
```typescript
// Configure batching for performance
posthog.init(apiKey, {
  batch_request_timeout_ms: 10000,
  request_batching: true,
  batch_size: 30
});
```

---

*This comprehensive PostHog setup ensures Tony's Toolbox has robust product analytics while maintaining user privacy and optimal performance.*
