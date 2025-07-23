# Analytics Overview - Tony's Toolbox

This document provides a comprehensive overview of the analytics infrastructure for Tony's Toolbox, detailing how we collect, process, and analyze user behavior data to drive product decisions and improve user experience while maintaining strict privacy compliance.

## 📊 Analytics Architecture

Tony's Toolbox employs a dual-analytics approach combining product analytics with web analytics to provide comprehensive insights into user behavior, product performance, and business metrics.

### Analytics Stack Components

```typescript
// Analytics Service Architecture
interface AnalyticsStack {
  productAnalytics: PostHogAnalytics;
  webAnalytics: GoogleAnalytics;
  privacyManager: PrivacyComplianceService;
  dataProcessor: AnalyticsDataProcessor;
  reportingEngine: AnalyticsReportingEngine;
}

// Unified Analytics Interface
interface AnalyticsService {
  trackEvent(event: AnalyticsEvent): Promise<void>;
  trackPageView(page: PageViewEvent): Promise<void>;
  identifyUser(user: UserIdentity): Promise<void>;
  setUserProperties(properties: UserProperties): Promise<void>;
  trackConversion(conversion: ConversionEvent): Promise<void>;
}
```

**Primary Analytics Platforms:**

1. **PostHog** (Product Analytics)
   - Purpose: User behavior tracking, feature usage, conversion funnels
   - Features: Event tracking, user identification, cohort analysis, A/B testing
   - Privacy: GDPR compliant, user consent management
   - Data Location: EU hosting for privacy compliance

2. **Google Analytics 4** (Web Analytics)
   - Purpose: Traffic analysis, SEO performance, acquisition channels
   - Features: Page views, session tracking, traffic sources, demographics
   - Privacy: Enhanced privacy controls, cookieless measurement
   - Compliance: Privacy-friendly configuration with data retention limits

## 🎯 Key Metrics & KPIs

### Product Metrics (PostHog)

```typescript
interface ProductMetrics {
  // User Engagement
  userEngagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    sessionDuration: number;
    pagesPerSession: number;
    bounceRate: number;
  };
  
  // Feature Usage
  featureAdoption: {
    toolSearchUsage: number;
    toolRecommendationClicks: number;
    gptEmbedViews: number;
    userAccountCreation: number;
    subscriptionUpgrades: number;
  };
  
  // Conversion Metrics
  conversionFunnels: {
    visitorToUser: number;
    userToSubscriber: number;
    freeToSubscriber: number;
    toolDiscoveryToClick: number;
  };
  
  // Retention Metrics
  userRetention: {
    dayOneRetention: number;
    daySevenRetention: number;
    dayThirtyRetention: number;
    churnRate: number;
  };
}

class ProductAnalyticsCollector {
  async trackFeatureUsage(
    feature: string, 
    userId: string, 
    metadata: Record<string, any>
  ): Promise<void> {
    await this.posthog.capture({
      distinctId: userId,
      event: `feature_used_${feature}`,
      properties: {
        feature_name: feature,
        timestamp: new Date().toISOString(),
        ...metadata
      }
    });
  }
  
  async trackUserJourney(
    userId: string,
    journeyStep: string,
    context: JourneyContext
  ): Promise<void> {
    await this.posthog.capture({
      distinctId: userId,
      event: 'user_journey_progression',
      properties: {
        journey_step: journeyStep,
        previous_step: context.previousStep,
        time_since_last_step: context.timeSinceLastStep,
        session_id: context.sessionId,
        referrer: context.referrer
      }
    });
  }
}
```

### Web Analytics Metrics (Google Analytics)

```typescript
interface WebAnalyticsMetrics {
  // Traffic & Acquisition
  trafficMetrics: {
    totalUsers: number;
    newUsers: number;
    sessions: number;
    pageViews: number;
    avgSessionDuration: number;
  };
  
  // Acquisition Channels
  acquisitionChannels: {
    organicSearch: number;
    directTraffic: number;
    socialMedia: number;
    referralTraffic: number;
    paidSearch: number;
    email: number;
  };
  
  // Content Performance
  contentMetrics: {
    topPages: PagePerformance[];
    exitPages: string[];
    searchQueries: string[];
    conversionPages: string[];
  };
  
  // Technical Performance
  technicalMetrics: {
    pageLoadTime: number;
    corellWebVitals: CoreWebVitals;
    deviceBreakdown: DeviceMetrics;
    browserBreakdown: BrowserMetrics;
  };
}

class WebAnalyticsCollector {
  async trackPagePerformance(
    page: string,
    performanceMetrics: PerformanceMetrics
  ): Promise<void> {
    gtag('event', 'page_performance', {
      page_title: page,
      page_load_time: performanceMetrics.loadTime,
      first_contentful_paint: performanceMetrics.fcp,
      largest_contentful_paint: performanceMetrics.lcp,
      cumulative_layout_shift: performanceMetrics.cls,
      first_input_delay: performanceMetrics.fid
    });
  }
  
  async trackConversionGoal(
    goalName: string,
    goalValue: number,
    metadata: Record<string, any>
  ): Promise<void> {
    gtag('event', 'conversion', {
      send_to: `${this.gaTrackingId}/${goalName}`,
      value: goalValue,
      currency: 'USD',
      ...metadata
    });
  }
}
```

## 🔐 Privacy & Compliance

### GDPR & Privacy Compliance

```typescript
class PrivacyComplianceManager {
  private userConsents = new Map<string, UserConsent>();
  
  async requestAnalyticsConsent(userId: string): Promise<ConsentResult> {
    const consentModal = this.createConsentModal({
      title: 'Help us improve your experience',
      description: 'We use analytics to understand how you use Tony\'s Toolbox and improve our features.',
      options: {
        essential: {
          name: 'Essential Analytics',
          description: 'Basic usage analytics to ensure the site works properly',
          required: true,
          enabled: true
        },
        functional: {
          name: 'Feature Analytics',
          description: 'Track how you interact with features to improve them',
          required: false,
          enabled: false
        },
        marketing: {
          name: 'Marketing Analytics',
          description: 'Understand which channels bring you here to improve our outreach',
          required: false,
          enabled: false
        }
      }
    });
    
    const userResponse = await consentModal.getUserResponse();
    
    // Store consent preferences
    const consent: UserConsent = {
      userId,
      essential: true, // Always required
      functional: userResponse.functional,
      marketing: userResponse.marketing,
      timestamp: new Date(),
      ipAddress: await this.getHashedIP(), // Hash for privacy
      userAgent: this.getUserAgent()
    };
    
    this.userConsents.set(userId, consent);
    await this.persistConsent(consent);
    
    // Configure analytics based on consent
    await this.configureAnalyticsConsent(consent);
    
    return {
      granted: true,
      consent,
      analyticsEnabled: consent.functional || consent.marketing
    };
  }
  
  async configureAnalyticsConsent(consent: UserConsent): Promise<void> {
    // Configure PostHog based on consent
    if (consent.functional) {
      this.posthog.opt_in_capturing();
      this.posthog.set_config({
        persistence: 'localStorage',
        disable_session_recording: !consent.functional
      });
    } else {
      this.posthog.opt_out_capturing();
    }
    
    // Configure Google Analytics based on consent
    gtag('consent', 'update', {
      analytics_storage: consent.marketing ? 'granted' : 'denied',
      ad_storage: 'denied', // We don't use ads
      functionality_storage: consent.functional ? 'granted' : 'denied',
      personalization_storage: consent.functional ? 'granted' : 'denied'
    });
  }
}
```

### Data Anonymization & Security

```typescript
class DataPrivacyProcessor {
  async anonymizeUserData(rawEvent: RawAnalyticsEvent): Promise<AnonymizedEvent> {
    return {
      ...rawEvent,
      userId: this.hashUserId(rawEvent.userId),
      ipAddress: this.anonymizeIP(rawEvent.ipAddress),
      userAgent: this.generalizeUserAgent(rawEvent.userAgent),
      timestamp: this.roundTimestamp(rawEvent.timestamp), // Round to hour for privacy
      location: this.generalizeLocation(rawEvent.location) // City level only
    };
  }
  
  private hashUserId(userId: string): string {
    return crypto
      .createHash('sha256')
      .update(userId + this.getSalt())
      .digest('hex')
      .substring(0, 16); // Use first 16 chars for shorter ID
  }
  
  private anonymizeIP(ip: string): string {
    // Remove last octet for IPv4, last 80 bits for IPv6
    const ipv4Pattern = /^(\d+\.\d+\.\d+)\.\d+$/;
    const ipv6Pattern = /^(.{1,19}):.*$/;
    
    if (ipv4Pattern.test(ip)) {
      return ip.replace(ipv4Pattern, '$1.0');
    } else if (ipv6Pattern.test(ip)) {
      return ip.replace(ipv6Pattern, '$1::');
    }
    
    return 'unknown';
  }
}
```

## 📈 Analytics Implementation

### Event Tracking Strategy

```typescript
// Standardized Event Schema
interface StandardAnalyticsEvent {
  event_name: string;
  event_category: 'user_action' | 'system_event' | 'business_metric';
  user_id?: string;
  session_id: string;
  timestamp: string;
  properties: Record<string, any>;
  context: EventContext;
}

interface EventContext {
  page_url: string;
  page_title: string;
  referrer?: string;
  user_agent: string;
  screen_resolution: string;
  device_type: 'desktop' | 'tablet' | 'mobile';
  browser: string;
  os: string;
}

class UnifiedAnalyticsService {
  async trackEvent(event: StandardAnalyticsEvent): Promise<void> {
    // Check user consent before tracking
    const consent = await this.getUserConsent(event.user_id);
    if (!this.canTrackEvent(event, consent)) {
      return;
    }
    
    // Anonymize data if required
    const processedEvent = await this.processEventForPrivacy(event, consent);
    
    // Send to appropriate analytics platforms
    const trackingPromises = [];
    
    if (consent.functional && this.shouldTrackInPostHog(event)) {
      trackingPromises.push(this.trackInPostHog(processedEvent));
    }
    
    if (consent.marketing && this.shouldTrackInGA(event)) {
      trackingPromises.push(this.trackInGA(processedEvent));
    }
    
    await Promise.all(trackingPromises);
  }
  
  private async trackInPostHog(event: StandardAnalyticsEvent): Promise<void> {
    await this.posthog.capture({
      distinctId: event.user_id || event.session_id,
      event: event.event_name,
      properties: {
        ...event.properties,
        $current_url: event.context.page_url,
        $referrer: event.context.referrer,
        category: event.event_category
      }
    });
  }
  
  private async trackInGA(event: StandardAnalyticsEvent): Promise<void> {
    gtag('event', event.event_name, {
      event_category: event.event_category,
      event_label: event.properties.label,
      value: event.properties.value,
      custom_parameter_1: event.properties.custom_data,
      page_title: event.context.page_title,
      page_location: event.context.page_url
    });
  }
}
```

### Custom Event Definitions

```typescript
// Business-Critical Events
const ANALYTICS_EVENTS = {
  // User Registration & Authentication
  USER_REGISTERED: 'user_registered',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  
  // Core Feature Usage
  TOOL_SEARCH_PERFORMED: 'tool_search_performed',
  TOOL_RECOMMENDATION_CLICKED: 'tool_recommendation_clicked',
  TOOL_BOOKMARKED: 'tool_bookmarked',
  GPT_EMBED_VIEWED: 'gpt_embed_viewed',
  
  // Content Engagement
  NEWS_ARTICLE_CLICKED: 'news_article_clicked',
  NEWS_ARTICLE_SHARED: 'news_article_shared',
  CONTENT_FEEDBACK_GIVEN: 'content_feedback_given',
  
  // Conversion Events
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_COMPLETED: 'subscription_completed',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  
  // Performance Events
  PAGE_LOAD_COMPLETED: 'page_load_completed',
  API_REQUEST_COMPLETED: 'api_request_completed',
  ERROR_ENCOUNTERED: 'error_encountered'
} as const;

// Event Implementation Examples
class EventTracker {
  async trackToolSearch(searchQuery: string, userId?: string): Promise<void> {
    await this.analytics.trackEvent({
      event_name: ANALYTICS_EVENTS.TOOL_SEARCH_PERFORMED,
      event_category: 'user_action',
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      properties: {
        search_query: this.sanitizeSearchQuery(searchQuery),
        query_length: searchQuery.length,
        has_filters: this.hasActiveFilters(),
        search_type: this.getSearchType()
      },
      context: this.getEventContext()
    });
  }
  
  async trackConversion(conversionType: string, value: number, userId: string): Promise<void> {
    await this.analytics.trackEvent({
      event_name: ANALYTICS_EVENTS.SUBSCRIPTION_COMPLETED,
      event_category: 'business_metric',
      user_id: userId,
      session_id: this.getSessionId(),
      timestamp: new Date().toISOString(),
      properties: {
        conversion_type: conversionType,
        conversion_value: value,
        currency: 'USD',
        subscription_tier: this.getSubscriptionTier(userId),
        payment_method: this.getPaymentMethod(),
        campaign_source: this.getCampaignSource()
      },
      context: this.getEventContext()
    });
  }
}
```

## 📊 Reporting & Dashboards

### Automated Reporting System

```typescript
class AnalyticsReportingEngine {
  async generateWeeklyReport(): Promise<WeeklyAnalyticsReport> {
    const weekRange = this.getLastWeekRange();
    
    const [
      userMetrics,
      featureMetrics,
      conversionMetrics,
      contentMetrics
    ] = await Promise.all([
      this.getUserMetrics(weekRange),
      this.getFeatureMetrics(weekRange),
      this.getConversionMetrics(weekRange),
      this.getContentMetrics(weekRange)
    ]);
    
    const insights = this.generateInsights({
      userMetrics,
      featureMetrics,
      conversionMetrics,
      contentMetrics
    });
    
    const recommendations = this.generateRecommendations(insights);
    
    return {
      reportPeriod: weekRange,
      summary: this.generateExecutiveSummary(insights),
      userMetrics,
      featureMetrics,
      conversionMetrics,
      contentMetrics,
      insights,
      recommendations,
      generatedAt: new Date()
    };
  }
  
  private generateInsights(metrics: WeeklyMetrics): AnalyticsInsight[] {
    const insights: AnalyticsInsight[] = [];
    
    // User Growth Analysis
    if (metrics.userMetrics.newUsers > metrics.userMetrics.previousWeekNewUsers * 1.2) {
      insights.push({
        type: 'positive_trend',
        category: 'user_growth',
        title: 'Significant user growth this week',
        description: `New users increased by ${((metrics.userMetrics.newUsers / metrics.userMetrics.previousWeekNewUsers - 1) * 100).toFixed(1)}%`,
        impact: 'high',
        actionable: true
      });
    }
    
    // Feature Adoption Analysis
    const topFeatures = this.getTopFeaturesByUsage(metrics.featureMetrics);
    insights.push({
      type: 'feature_usage',
      category: 'product',
      title: 'Most popular features',
      description: `Top features: ${topFeatures.slice(0, 3).map(f => f.name).join(', ')}`,
      impact: 'medium',
      actionable: true
    });
    
    return insights;
  }
}
```

### Real-time Dashboard Metrics

```typescript
interface DashboardMetrics {
  realTimeUsers: number;
  todayUsers: number;
  weekUsers: number;
  monthUsers: number;
  
  topPages: PageMetric[];
  topFeatures: FeatureMetric[];
  conversionRate: number;
  
  performanceMetrics: {
    averageLoadTime: number;
    errorRate: number;
    apiResponseTime: number;
  };
}

class RealTimeDashboard {
  async getDashboardData(): Promise<DashboardMetrics> {
    // Get real-time metrics from PostHog
    const realtimeData = await this.posthog.query({
      kind: 'EventsQuery',
      select: ['*'],
      where: [
        'timestamp >= now() - INTERVAL 5 MINUTE'
      ],
      limit: 1000
    });
    
    // Get daily/weekly/monthly aggregations
    const [dailyUsers, weeklyUsers, monthlyUsers] = await Promise.all([
      this.getUserCount('1 day'),
      this.getUserCount('7 days'),
      this.getUserCount('30 days')
    ]);
    
    return {
      realTimeUsers: this.countUniqueUsers(realtimeData.results),
      todayUsers: dailyUsers,
      weekUsers: weeklyUsers,
      monthUsers: monthlyUsers,
      topPages: await this.getTopPages(),
      topFeatures: await this.getTopFeatures(),
      conversionRate: await this.getConversionRate(),
      performanceMetrics: await this.getPerformanceMetrics()
    };
  }
}
```

## 🎯 Implementation Roadmap

### Phase 1: Foundation (Current)
- ✅ PostHog integration with basic event tracking
- ✅ Google Analytics 4 setup with privacy configuration
- ✅ GDPR consent management system
- 🔄 Core event definitions and tracking

### Phase 2: Advanced Analytics (Next 6 weeks)
- ⏳ Custom conversion funnels and cohort analysis
- ⏳ A/B testing framework integration
- ⏳ Advanced user segmentation
- ⏳ Automated reporting system

### Phase 3: Business Intelligence (3 months)
- ⏳ Predictive analytics and user behavior modeling
- ⏳ Revenue attribution and LTV analysis
- ⏳ Advanced dashboard with real-time insights
- ⏳ Cross-platform analytics integration

### Phase 4: AI-Powered Analytics (6 months)
- ⏳ Machine learning-based user insights
- ⏳ Automated anomaly detection
- ⏳ Intelligent recommendations for product improvements
- ⏳ Advanced personalization based on analytics data

---

*The Analytics Overview ensures Tony's Toolbox makes data-driven decisions while respecting user privacy through comprehensive tracking, intelligent insights, and GDPR-compliant data collection.*
