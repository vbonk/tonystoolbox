# Custom Events CheatSheet - Tony's Toolbox

This document provides a comprehensive reference for custom analytics events in Tony's Toolbox, including event definitions, property schemas, implementation examples, and best practices for consistent event tracking across the platform.

## 📊 Event Tracking Strategy

Tony's Toolbox employs a structured event tracking system that captures user interactions, business metrics, and system performance data to provide comprehensive insights into user behavior and platform performance.

### Event Naming Convention

```typescript
// Event Naming Structure: [category]_[action]_[object]
// Examples:
// - user_clicked_tool_link
// - subscription_started_premium_tier  
// - ai_generated_recommendation
// - search_performed_tool_query

interface EventNamingConvention {
  category: 'user' | 'system' | 'business' | 'ai' | 'content' | 'error';
  action: string; // past tense verb (clicked, viewed, started, completed, etc.)
  object: string; // what was acted upon (tool, link, subscription, etc.)
}

// Event Property Standards
interface EventPropertyStandards {
  // Required for all events
  timestamp: string; // ISO 8601 format
  user_id?: string; // null for anonymous users
  session_id: string; // unique session identifier
  
  // Contextual properties
  page_url: string;
  page_title: string;
  referrer?: string;
  
  // Device and environment
  device_type: 'desktop' | 'tablet' | 'mobile';
  browser: string;
  os: string;
  screen_resolution: string;
  
  // Application context
  app_version: string;
  environment: 'development' | 'staging' | 'production';
}
```

## 🎯 Core Event Categories

### 1. User Engagement Events

**Purpose**: Track user interactions and engagement patterns

```typescript
// User Authentication Events
const USER_AUTH_EVENTS = {
  // Account Management
  USER_REGISTERED: {
    event: 'user_registered',
    properties: {
      registration_method: 'email' | 'google' | 'github',
      user_type: 'individual' | 'business',
      referral_source?: string,
      campaign_source?: string,
      utm_campaign?: string,
      utm_medium?: string,
      utm_source?: string
    },
    example: {
      event: 'user_registered',
      properties: {
        registration_method: 'email',
        user_type: 'individual',
        referral_source: 'organic',
        utm_campaign: 'launch_week',
        utm_medium: 'social',
        utm_source: 'twitter'
      }
    }
  },
  
  USER_LOGGED_IN: {
    event: 'user_logged_in',
    properties: {
      login_method: 'email' | 'google' | 'github',
      is_returning_user: boolean,
      days_since_last_login?: number,
      login_attempt_count: number
    },
    example: {
      event: 'user_logged_in',
      properties: {
        login_method: 'email',
        is_returning_user: true,
        days_since_last_login: 7,
        login_attempt_count: 1
      }
    }
  },
  
  USER_LOGGED_OUT: {
    event: 'user_logged_out',
    properties: {
      session_duration: number, // seconds
      pages_viewed: number,
      actions_performed: number,
      logout_method: 'manual' | 'timeout' | 'forced'
    }
  }
};

// Navigation and Page Views
const NAVIGATION_EVENTS = {
  PAGE_VIEWED: {
    event: 'page_viewed',
    properties: {
      page_category: 'home' | 'tools' | 'projects' | 'dashboard' | 'admin',
      page_subcategory?: string,
      is_authenticated: boolean,
      load_time: number, // milliseconds
      previous_page?: string,
      navigation_method: 'direct' | 'internal_link' | 'back_button' | 'bookmark'
    },
    example: {
      event: 'page_viewed',
      properties: {
        page_category: 'tools',
        page_subcategory: 'ai_writing',
        is_authenticated: true,
        load_time: 1250,
        previous_page: '/dashboard',
        navigation_method: 'internal_link'
      }
    }
  },
  
  SEARCH_PERFORMED: {
    event: 'search_performed',
    properties: {
      search_query: string,
      search_type: 'tools' | 'projects' | 'news' | 'global',
      results_count: number,
      query_length: number,
      has_filters: boolean,
      applied_filters?: {
        category?: string[],
        pricing?: string[],
        features?: string[]
      },
      search_duration: number, // milliseconds
      result_interaction: 'clicked' | 'none' | 'refined'
    },
    example: {
      event: 'search_performed',
      properties: {
        search_query: 'ai writing tools',
        search_type: 'tools',
        results_count: 12,
        query_length: 16,
        has_filters: true,
        applied_filters: {
          category: ['writing', 'content-creation'],
          pricing: ['free', 'freemium']
        },
        search_duration: 2300,
        result_interaction: 'clicked'
      }
    }
  }
};
```

### 2. Tool Discovery & Interaction Events

**Purpose**: Track how users discover and interact with AI tools

```typescript
const TOOL_INTERACTION_EVENTS = {
  TOOL_VIEWED: {
    event: 'tool_viewed',
    properties: {
      tool_id: string,
      tool_name: string,
      tool_category: string,
      tool_subcategory?: string,
      pricing_model: 'free' | 'freemium' | 'paid' | 'enterprise',
      view_source: 'search' | 'recommendation' | 'category_browse' | 'featured' | 'direct',
      view_position?: number, // position in list/grid
      time_on_page: number, // seconds
      scroll_depth: number // percentage
    },
    example: {
      event: 'tool_viewed',
      properties: {
        tool_id: 'chatgpt-4',
        tool_name: 'ChatGPT-4',
        tool_category: 'conversational-ai',
        tool_subcategory: 'text-generation',
        pricing_model: 'freemium',
        view_source: 'search',
        view_position: 3,
        time_on_page: 45,
        scroll_depth: 80
      }
    }
  },
  
  TOOL_CLICKED: {
    event: 'tool_clicked',
    properties: {
      tool_id: string,
      tool_name: string,
      click_type: 'visit_website' | 'try_demo' | 'view_pricing' | 'bookmark' | 'share',
      link_type: 'affiliate' | 'direct' | 'demo',
      click_position: number,
      is_authenticated: boolean,
      user_subscription_tier?: 'free' | 'pro' | 'enterprise'
    },
    example: {
      event: 'tool_clicked',
      properties: {
        tool_id: 'notion-ai',
        tool_name: 'Notion AI',
        click_type: 'visit_website',
        link_type: 'affiliate',
        click_position: 1,
        is_authenticated: true,
        user_subscription_tier: 'pro'
      }
    }
  },
  
  TOOL_BOOKMARKED: {
    event: 'tool_bookmarked',
    properties: {
      tool_id: string,
      tool_name: string,
      tool_category: string,
      bookmark_action: 'added' | 'removed',
      bookmark_source: 'tool_page' | 'search_results' | 'recommendations',
      total_bookmarks?: number // user's total bookmarks after action
    }
  },
  
  TOOL_SHARED: {
    event: 'tool_shared',
    properties: {
      tool_id: string,
      tool_name: string,
      share_method: 'copy_link' | 'email' | 'twitter' | 'linkedin' | 'facebook',
      share_context: 'tool_page' | 'search_results' | 'bookmarks',
      custom_message?: boolean
    }
  }
};
```

### 3. AI-Powered Feature Events

**Purpose**: Track AI recommendation system performance and user interactions

```typescript
const AI_FEATURE_EVENTS = {
  AI_RECOMMENDATION_SHOWN: {
    event: 'ai_recommendation_shown',
    properties: {
      recommendation_id: string,
      recommendation_type: 'similar_tools' | 'personalized' | 'trending' | 'category_based',
      algorithm_version: string,
      recommended_tools: string[], // array of tool IDs
      user_context: {
        recent_searches?: string[],
        bookmarked_categories?: string[],
        subscription_tier: string,
        activity_level: 'new' | 'casual' | 'active' | 'power_user'
      },
      confidence_score: number, // 0-1 AI confidence in recommendations
      position_shown: 'sidebar' | 'footer' | 'modal' | 'inline'
    },
    example: {
      event: 'ai_recommendation_shown',
      properties: {
        recommendation_id: 'rec_abc123',
        recommendation_type: 'personalized',
        algorithm_version: 'v2.1.0',
        recommended_tools: ['midjourney', 'dall-e-2', 'stable-diffusion'],
        user_context: {
          recent_searches: ['image generation', 'ai art'],
          bookmarked_categories: ['design', 'creative'],
          subscription_tier: 'pro',
          activity_level: 'active'
        },
        confidence_score: 0.87,
        position_shown: 'sidebar'
      }
    }
  },
  
  AI_RECOMMENDATION_CLICKED: {
    event: 'ai_recommendation_clicked',
    properties: {
      recommendation_id: string,
      clicked_tool_id: string,
      clicked_tool_name: string,
      recommendation_position: number, // position in recommendation list
      time_to_click: number, // seconds from show to click
      recommendation_relevance?: 'high' | 'medium' | 'low' // user feedback
    }
  },
  
  GPT_EMBED_LOADED: {
    event: 'gpt_embed_loaded',
    properties: {
      gpt_id: string,
      gpt_name: string,
      gpt_category: string,
      embed_type: 'iframe' | 'widget' | 'modal',
      load_time: number, // milliseconds
      load_success: boolean,
      error_type?: string // if load_success is false
    }
  },
  
  GPT_EMBED_INTERACTED: {
    event: 'gpt_embed_interacted',
    properties: {
      gpt_id: string,
      interaction_type: 'message_sent' | 'feature_used' | 'settings_changed',
      session_duration: number, // seconds
      messages_exchanged?: number,
      user_satisfaction?: 1 | 2 | 3 | 4 | 5 // if feedback provided
    }
  }
};
```

### 4. Business & Conversion Events

**Purpose**: Track revenue-impacting activities and conversion funnels

```typescript
const BUSINESS_EVENTS = {
  SUBSCRIPTION_STARTED: {
    event: 'subscription_started',
    properties: {
      subscription_tier: 'pro' | 'enterprise',
      billing_cycle: 'monthly' | 'annual',
      subscription_price: number,
      currency: string,
      payment_method: 'card' | 'paypal' | 'bank_transfer',
      discount_applied?: {
        code: string,
        discount_percent: number,
        discount_amount: number
      },
      trial_offered: boolean,
      trial_duration?: number, // days
      conversion_source: 'organic' | 'referral' | 'campaign' | 'affiliate',
      user_journey_touchpoints: string[] // pages visited before conversion
    },
    example: {
      event: 'subscription_started',
      properties: {
        subscription_tier: 'pro',
        billing_cycle: 'annual',
        subscription_price: 99,
        currency: 'USD',
        payment_method: 'card',
        discount_applied: {
          code: 'LAUNCH20',
          discount_percent: 20,
          discount_amount: 19.8
        },
        trial_offered: true,
        trial_duration: 14,
        conversion_source: 'organic',
        user_journey_touchpoints: ['home', 'tools', 'pricing', 'checkout']
      }
    }
  },
  
  AFFILIATE_CLICKED: {
    event: 'affiliate_clicked',
    properties: {
      tool_id: string,
      tool_name: string,
      affiliate_url: string,
      affiliate_partner: string,
      commission_potential: number, // expected commission
      click_context: 'tool_page' | 'recommendation' | 'search_results' | 'email',
      user_subscription_tier?: string,
      referral_tracking_id: string
    },
    example: {
      event: 'affiliate_clicked',
      properties: {
        tool_id: 'jasper-ai',
        tool_name: 'Jasper AI',
        affiliate_url: 'https://jasper.ai/?ref=tonystoolbox&tracking=tb_001',
        affiliate_partner: 'jasper',
        commission_potential: 50,
        click_context: 'tool_page',
        user_subscription_tier: 'pro',
        referral_tracking_id: 'tb_001_user_456'
      }
    }
  },
  
  NEWSLETTER_SUBSCRIBED: {
    event: 'newsletter_subscribed',
    properties: {
      subscription_source: 'popup' | 'footer' | 'sidebar' | 'dedicated_page',
      user_type: 'new' | 'existing',
      interests_selected?: string[],
      frequency_preference?: 'daily' | 'weekly' | 'monthly',
      double_opt_in_required: boolean
    }
  },
  
  UPGRADE_PROMPTED: {
    event: 'upgrade_prompted',
    properties: {
      prompt_trigger: 'feature_limit' | 'usage_limit' | 'promotional' | 'manual',
      current_tier: 'free' | 'pro',
      suggested_tier: 'pro' | 'enterprise',
      feature_blocked?: string,
      prompt_location: 'modal' | 'banner' | 'sidebar' | 'page',
      user_response: 'dismissed' | 'clicked_upgrade' | 'clicked_learn_more'
    }
  }
};
```

### 5. Content & News Events

**Purpose**: Track content engagement and news consumption patterns

```typescript
const CONTENT_EVENTS = {
  NEWS_ARTICLE_VIEWED: {
    event: 'news_article_viewed',
    properties: {
      article_id: string,
      article_title: string,
      article_category: string,
      article_source: string,
      publish_date: string,
      reading_time_estimate: number, // minutes
      time_on_article: number, // seconds actually spent
      scroll_depth: number, // percentage
      read_completion: number, // estimated percentage read
      traffic_source: 'news_feed' | 'newsletter' | 'social' | 'direct',
      trending_rank?: number // if article is trending
    },
    example: {
      event: 'news_article_viewed',
      properties: {
        article_id: 'art_789',
        article_title: 'OpenAI Releases GPT-5: Revolutionary AI Breakthrough',
        article_category: 'ai_releases',
        article_source: 'TechCrunch',
        publish_date: '2024-01-15T10:00:00Z',
        reading_time_estimate: 3,
        time_on_article: 120,
        scroll_depth: 75,
        read_completion: 80,
        traffic_source: 'news_feed',
        trending_rank: 1
      }
    }
  },
  
  PROJECT_SHOWCASE_VIEWED: {
    event: 'project_showcase_viewed',
    properties: {
      project_id: string,
      project_title: string,
      project_category: string,
      tools_featured: string[],
      view_source: 'homepage' | 'projects_page' | 'tool_recommendation' | 'search',
      demo_interaction: boolean,
      github_link_clicked?: boolean,
      live_demo_clicked?: boolean
    }
  },
  
  CONTENT_SHARED: {
    event: 'content_shared',
    properties: {
      content_type: 'tool' | 'article' | 'project' | 'guide',
      content_id: string,
      content_title: string,
      share_platform: 'twitter' | 'linkedin' | 'facebook' | 'reddit' | 'copy_link' | 'email',
      share_context: 'content_page' | 'share_modal' | 'social_buttons',
      custom_message: boolean
    }
  }
};
```

### 6. System Performance & Error Events

**Purpose**: Monitor system health and user experience issues

```typescript
const SYSTEM_EVENTS = {
  PAGE_PERFORMANCE: {
    event: 'page_performance',
    properties: {
      page_url: string,
      load_time: number, // milliseconds
      first_contentful_paint: number,
      largest_contentful_paint: number,
      cumulative_layout_shift: number,
      first_input_delay: number,
      time_to_interactive: number,
      performance_score: number, // 0-100 Lighthouse-style score
      connection_type: string,
      device_memory?: number // GB
    },
    example: {
      event: 'page_performance',
      properties: {
        page_url: '/tools/chatgpt',
        load_time: 1200,
        first_contentful_paint: 800,
        largest_contentful_paint: 1100,
        cumulative_layout_shift: 0.05,
        first_input_delay: 50,
        time_to_interactive: 1150,
        performance_score: 92,
        connection_type: '4g',
        device_memory: 8
      }
    }
  },
  
  ERROR_ENCOUNTERED: {
    event: 'error_encountered',
    properties: {
      error_type: 'javascript' | 'network' | 'authentication' | '404' | '500' | 'payment',
      error_message: string,
      error_code?: string,
      stack_trace?: string, // truncated for privacy
      page_url: string,
      user_action: string, // what user was trying to do
      error_boundary?: string, // React error boundary that caught it
      recovery_possible: boolean,
      user_impact: 'low' | 'medium' | 'high' | 'critical'
    }
  },
  
  API_REQUEST_COMPLETED: {
    event: 'api_request_completed',
    properties: {
      endpoint: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      status_code: number,
      response_time: number, // milliseconds
      request_size?: number, // bytes
      response_size?: number, // bytes
      cache_hit: boolean,
      user_authenticated: boolean,
      rate_limited: boolean
    }
  }
};
```

## 🔧 Implementation Helpers

### Event Tracking Utilities

```typescript
// Unified Event Tracker
class AnalyticsEventTracker {
  private posthog: PostHogClient;
  private ga: GoogleAnalyticsClient;
  
  constructor() {
    this.posthog = new PostHogClient();
    this.ga = new GoogleAnalyticsClient();
  }
  
  // Main event tracking method
  async trackEvent(
    eventName: string,
    properties: Record<string, any>,
    options?: TrackingOptions
  ): Promise<void> {
    // Add standard properties
    const enrichedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId(),
      page_url: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      device_type: this.getDeviceType(),
      app_version: process.env.NEXT_PUBLIC_APP_VERSION,
      environment: process.env.NODE_ENV
    };
    
    // Track to PostHog (primary analytics)
    if (this.hasAnalyticsConsent()) {
      await this.posthog.capture(eventName, enrichedProperties);
    }
    
    // Track to Google Analytics (web analytics)
    if (this.hasMarketingConsent()) {
      await this.ga.trackEvent(eventName, enrichedProperties);
    }
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', { eventName, properties: enrichedProperties });
    }
  }
  
  // Convenience methods for common events
  async trackToolInteraction(
    toolId: string,
    toolName: string,
    action: 'viewed' | 'clicked' | 'bookmarked' | 'shared',
    additionalProperties?: Record<string, any>
  ): Promise<void> {
    const eventName = `tool_${action}`;
    const properties = {
      tool_id: toolId,
      tool_name: toolName,
      ...additionalProperties
    };
    
    await this.trackEvent(eventName, properties);
  }
  
  async trackUserJourney(
    step: string,
    additionalProperties?: Record<string, any>
  ): Promise<void> {
    const properties = {
      journey_step: step,
      previous_step: this.getPreviousJourneyStep(),
      time_since_last_step: this.getTimeSinceLastStep(),
      ...additionalProperties
    };
    
    await this.trackEvent('user_journey_step', properties);
  }
  
  async trackConversion(
    conversionType: string,
    value: number,
    additionalProperties?: Record<string, any>
  ): Promise<void> {
    const properties = {
      conversion_type: conversionType,
      conversion_value: value,
      currency: 'USD',
      ...additionalProperties
    };
    
    await this.trackEvent('conversion_completed', properties);
  }
  
  // Error tracking
  async trackError(
    error: Error,
    context: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<void> {
    const properties = {
      error_message: error.message,
      error_name: error.name,
      error_stack: error.stack?.substring(0, 500), // Truncate for privacy
      error_context: context,
      severity,
      user_action: this.getCurrentUserAction(),
      page_url: window.location.href
    };
    
    await this.trackEvent('error_encountered', properties);
  }
  
  // Performance tracking
  async trackPerformance(performanceData: PerformanceEntry): Promise<void> {
    if (performanceData.entryType === 'navigation') {
      const navEntry = performanceData as PerformanceNavigationTiming;
      
      const properties = {
        page_url: window.location.href,
        load_time: navEntry.loadEventEnd - navEntry.loadEventStart,
        dom_content_loaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
        first_contentful_paint: this.getFirstContentfulPaint(),
        largest_contentful_paint: this.getLargestContentfulPaint(),
        cumulative_layout_shift: this.getCumulativeLayoutShift(),
        first_input_delay: this.getFirstInputDelay()
      };
      
      await this.trackEvent('page_performance', properties);
    }
  }
  
  // Private helper methods
  private getSessionId(): string {
    return sessionStorage.getItem('analytics_session_id') || this.generateSessionId();
  }
  
  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }
  
  private hasAnalyticsConsent(): boolean {
    return localStorage.getItem('analytics_consent') === 'granted';
  }
  
  private hasMarketingConsent(): boolean {
    return localStorage.getItem('marketing_consent') === 'granted';
  }
}

// Global analytics instance
export const analytics = new AnalyticsEventTracker();
```

### React Hooks for Event Tracking

```typescript
// Custom hooks for common tracking patterns
export const useAnalytics = () => {
  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      analytics.trackEvent(eventName, properties);
    },
    []
  );
  
  const trackToolInteraction = useCallback(
    (toolId: string, toolName: string, action: string, properties?: Record<string, any>) => {
      analytics.trackToolInteraction(toolId, toolName, action as any, properties);
    },
    []
  );
  
  const trackPageView = useCallback(() => {
    analytics.trackEvent('page_viewed', {
      page_category: getPageCategory(window.location.pathname),
      is_authenticated: !!localStorage.getItem('auth_token')
    });
  }, []);
  
  return {
    trackEvent,
    trackToolInteraction,
    trackPageView
  };
};

// Page view tracking hook
export const usePageViewTracking = () => {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);
};

// Performance tracking hook
export const usePerformanceTracking = () => {
  useEffect(() => {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length > 0) {
          analytics.trackPerformance(perfEntries[0]);
        }
      }, 0);
    });
    
    // Track Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(analytics.trackPerformance);
      getFID(analytics.trackPerformance);
      getFCP(analytics.trackPerformance);
      getLCP(analytics.trackPerformance);
      getTTFB(analytics.trackPerformance);
    });
  }, []);
};
```

## 📋 Event Testing & Validation

### Event Validation Schema

```typescript
// Event validation using Zod
import { z } from 'zod';

const BaseEventSchema = z.object({
  event: z.string().min(1),
  properties: z.object({
    timestamp: z.string().datetime(),
    session_id: z.string().uuid(),
    user_id: z.string().uuid().optional(),
    page_url: z.string().url(),
    device_type: z.enum(['desktop', 'tablet', 'mobile']),
    environment: z.enum(['development', 'staging', 'production'])
  }).passthrough()
});

const ToolEventSchema = BaseEventSchema.extend({
  event: z.enum(['tool_viewed', 'tool_clicked', 'tool_bookmarked', 'tool_shared']),
  properties: z.object({
    tool_id: z.string(),
    tool_name: z.string(),
    tool_category: z.string()
  }).passthrough()
});

// Validation helper
export const validateEvent = (eventData: any): boolean => {
  try {
    BaseEventSchema.parse(eventData);
    return true;
  } catch (error) {
    console.error('Event validation failed:', error);
    return false;
  }
};
```

## 🎯 Implementation Checklist

### Event Tracking Setup
- ✅ Implement unified event tracking system
- ✅ Set up PostHog and Google Analytics integration
- ✅ Create event validation schemas
- ✅ Implement privacy-compliant tracking
- ✅ Set up development environment debugging

### Core Events Implementation
- ✅ User authentication and registration events
- ✅ Tool discovery and interaction events
- ✅ AI recommendation system events
- ✅ Business and conversion events
- ✅ Content engagement events
- ✅ System performance and error events

### Monitoring & Optimization
- ✅ Event tracking dashboard setup
- ✅ Performance monitoring integration
- ✅ Error tracking and alerting
- ✅ A/B testing event framework
- ✅ Regular event schema reviews

---

*The Custom Events CheatSheet ensures consistent, comprehensive event tracking across Tony's Toolbox, enabling data-driven decision making and deep insights into user behavior and business performance.*
