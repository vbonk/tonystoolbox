# Google Analytics 4 Setup - Tony's Toolbox

This document provides comprehensive instructions for implementing Google Analytics 4 (GA4) in Tony's Toolbox, including advanced configuration, privacy compliance, custom events, conversion tracking, and reporting optimization for AI tool discovery and user engagement analytics.

## 📊 GA4 Overview & Strategy

Google Analytics 4 serves as the web analytics backbone for Tony's Toolbox, complementing PostHog's product analytics by focusing on traffic acquisition, SEO performance, and macro-level user behavior patterns across the AI tool discovery platform.

### GA4 Implementation Goals

```typescript
// GA4 Analytics Strategy
interface GA4AnalyticsStrategy {
  primaryObjectives: {
    trafficAnalysis: 'Understand user acquisition channels and traffic patterns';
    seoPerformance: 'Track organic search performance and keyword rankings';
    contentEngagement: 'Measure content consumption and user engagement';
    conversionFunnels: 'Monitor subscription and affiliate conversion paths';
    audienceInsights: 'Analyze user demographics and behavior segments';
  };
  
  complementsPostHog: {
    macroTrends: 'GA4 focuses on high-level traffic and acquisition patterns';
    seoInsights: 'Search performance and organic discovery analytics';
    audienceSegmentation: 'Demographic and interest-based user segments';
    channelAttribution: 'Multi-channel conversion attribution';
    benchmarking: 'Industry comparison and competitive analysis';
  };
  
  privacyCompliance: {
    gdprCompliant: 'Full GDPR compliance with consent management';
    cookielessTracking: 'Enhanced measurement with privacy controls';
    dataRetention: 'Configurable data retention periods';
    ipAnonymization: 'Automatic IP address anonymization';
  };
}
```

## 🚀 Advanced GA4 Installation

### 1. **Next.js App Router Integration**

```typescript
// app/layout.tsx - GA4 Integration with App Router
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { ConsentManager } from '@/components/analytics/ConsentManager';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GA4 with privacy-first loading */}
        <GoogleAnalytics />
      </head>
      <body>
        <ConsentManager />
        {children}
      </body>
    </html>
  );
}
```

### 2. **Privacy-Compliant GA4 Component**

```typescript
// components/analytics/GoogleAnalytics.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  
  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn('Google Analytics tracking ID not found');
      return;
    }
    
    // Initialize GA4 with privacy-first configuration
    const initGA4 = () => {
      window.dataLayer = window.dataLayer || [];
      
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      
      window.gtag = gtag;
      
      // Configure consent mode (default to denied for privacy)
      gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted', // Always required
      });
      
      // Initialize GA4
      gtag('js', new Date());
      
      // Configure GA4 with privacy settings
      gtag('config', GA_TRACKING_ID, {
        // Privacy and compliance settings
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        
        // Performance and efficiency
        send_page_view: false, // We'll handle this manually
        
        // Custom dimensions mapping
        custom_map: {
          custom_parameter_1: 'user_type',
          custom_parameter_2: 'subscription_tier',
          custom_parameter_3: 'tool_category',
          custom_parameter_4: 'search_query'
        },
        
        // Enhanced ecommerce for affiliate tracking
        enhanced_ecommerce: true,
        allow_enhanced_conversions: false, // Privacy-first approach
        
        // Debug mode for development
        debug_mode: process.env.NODE_ENV === 'development',
        
        // Cookie settings
        cookie_expires: 63072000, // 2 years in seconds
        cookie_update: true,
        cookie_flags: 'SameSite=Lax;Secure',
        
        // Data retention
        storage: 'none', // Will be updated based on consent
      });
      
      // Set up enhanced measurement events
      gtag('config', GA_TRACKING_ID, {
        enhanced_measurements: {
          scrolls: true,
          outbound_clicks: true,
          site_search: true,
          video_engagement: false, // We don't have videos yet
          file_downloads: true
        }
      });
    };
    
    initGA4();
  }, [GA_TRACKING_ID]);
  
  if (!GA_TRACKING_ID) {
    return null;
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
    </>
  );
};
```

### 3. **Consent Management Integration**

```typescript
// hooks/useGA4Consent.ts
import { useEffect } from 'react';

interface ConsentSettings {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const useGA4Consent = () => {
  const updateConsent = (consentSettings: ConsentSettings) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consentSettings.analytics ? 'granted' : 'denied',
        functionality_storage: consentSettings.functional ? 'granted' : 'denied',
        personalization_storage: consentSettings.functional ? 'granted' : 'denied',
        // ad_storage remains denied as we don't use ads
        ad_storage: 'denied',
        // security_storage always granted
        security_storage: 'granted'
      });
      
      // Update GA4 configuration based on consent
      const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
      if (GA_TRACKING_ID) {
        window.gtag('config', GA_TRACKING_ID, {
          storage: consentSettings.analytics ? 'granted' : 'denied',
          anonymize_ip: true, // Always anonymize
          allow_google_signals: consentSettings.marketing,
          allow_ad_personalization_signals: false // Always disabled
        });
      }
    }
  };
  
  const trackConsentDecision = (decision: 'accepted' | 'rejected' | 'customized', details: ConsentSettings) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consent_decision', {
        event_category: 'Privacy',
        event_label: decision,
        custom_parameter_1: details.analytics ? 'analytics_granted' : 'analytics_denied',
        custom_parameter_2: details.marketing ? 'marketing_granted' : 'marketing_denied',
        custom_parameter_3: details.functional ? 'functional_granted' : 'functional_denied'
      });
    }
  };
  
  return { updateConsent, trackConsentDecision };
};
```

## 📈 Custom Event Tracking Setup

### Core Event Categories for Tony's Toolbox

```typescript
// lib/analytics/ga4-events.ts
class GA4EventTracker {
  private GA_TRACKING_ID: string;
  
  constructor() {
    this.GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID!;
  }
  
  // Page view tracking with enhanced context
  trackPageView(pageData: {
    page_title: string;
    page_location: string;
    page_category: string;
    content_group1?: string; // Tool category
    content_group2?: string; // User type
    content_group3?: string; // Subscription tier
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.GA_TRACKING_ID, {
        page_title: pageData.page_title,
        page_location: pageData.page_location,
        content_group1: pageData.content_group1,
        content_group2: pageData.content_group2,
        content_group3: pageData.content_group3,
        custom_parameter_1: pageData.page_category
      });
      
      window.gtag('event', 'page_view', {
        page_title: pageData.page_title,
        page_location: pageData.page_location,
        page_referrer: document.referrer,
        engagement_time_msec: 100 // Initial engagement
      });
    }
  }
  
  // Tool discovery and interaction events
  trackToolInteraction(eventData: {
    tool_id: string;
    tool_name: string;
    tool_category: string;
    action: 'view' | 'click' | 'bookmark' | 'share';
    source: string;
    position?: number;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      const eventName = `tool_${eventData.action}`;
      
      window.gtag('event', eventName, {
        event_category: 'Tool Discovery',
        event_label: eventData.tool_name,
        custom_parameter_1: eventData.tool_category,
        custom_parameter_2: eventData.source,
        custom_parameter_3: eventData.position?.toString(),
        value: this.getToolInteractionValue(eventData.action)
      });
      
      // Enhanced ecommerce for affiliate clicks
      if (eventData.action === 'click') {
        window.gtag('event', 'select_item', {
          item_list_id: eventData.tool_category,
          item_list_name: `${eventData.tool_category} Tools`,
          items: [{
            item_id: eventData.tool_id,
            item_name: eventData.tool_name,
            item_category: eventData.tool_category,
            item_list_position: eventData.position || 1,
            price: 0, // Free to discover
            quantity: 1
          }]
        });
      }
    }
  }
  
  // Search and discovery events
  trackSiteSearch(searchData: {
    search_term: string;
    search_category?: string;
    results_count: number;
    filters_applied?: string[];
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchData.search_term,
        event_category: 'Site Search',
        event_label: searchData.search_category || 'all',
        custom_parameter_1: searchData.results_count.toString(),
        custom_parameter_2: searchData.filters_applied?.join(',') || 'none',
        value: Math.min(searchData.results_count, 100) // Cap at 100 for value
      });
    }
  }
  
  // User engagement and conversion events
  trackConversion(conversionData: {
    conversion_type: 'newsletter_signup' | 'affiliate_click' | 'subscription_start' | 'account_creation';
    conversion_value?: number;
    currency?: string;
    metadata?: Record<string, any>;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      const eventName = conversionData.conversion_type;
      
      window.gtag('event', eventName, {
        event_category: 'Conversion',
        event_label: conversionData.conversion_type,
        value: conversionData.conversion_value || 1,
        currency: conversionData.currency || 'USD',
        custom_parameter_1: conversionData.metadata?.source || 'unknown',
        custom_parameter_2: conversionData.metadata?.campaign || 'organic'
      });
      
      // Enhanced ecommerce for subscription conversions
      if (conversionData.conversion_type === 'subscription_start') {
        window.gtag('event', 'purchase', {
          transaction_id: conversionData.metadata?.transaction_id || `tx_${Date.now()}`,
          value: conversionData.conversion_value || 0,
          currency: conversionData.currency || 'USD',
          items: [{
            item_id: conversionData.metadata?.plan_id || 'unknown_plan',
            item_name: conversionData.metadata?.plan_name || 'Subscription',
            item_category: 'Subscription',
            price: conversionData.conversion_value || 0,
            quantity: 1
          }]
        });
      }
    }
  }
  
  // Content engagement events
  trackContentEngagement(contentData: {
    content_type: 'article' | 'tool_page' | 'project' | 'guide';
    content_id: string;
    content_title: string;
    action: 'read' | 'share' | 'bookmark' | 'comment';
    engagement_duration?: number;
    scroll_depth?: number;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      const eventName = `${contentData.content_type}_${contentData.action}`;
      
      window.gtag('event', eventName, {
        event_category: 'Content Engagement',
        event_label: contentData.content_title,
        custom_parameter_1: contentData.content_type,
        custom_parameter_2: contentData.engagement_duration?.toString() || '0',
        custom_parameter_3: contentData.scroll_depth?.toString() || '0',
        value: this.getContentEngagementValue(contentData.action, contentData.engagement_duration)
      });
    }
  }
  
  // AI feature interaction events
  trackAIFeatureUsage(aiData: {
    feature_type: 'recommendation' | 'gpt_embed' | 'smart_search' | 'personalization';
    feature_id: string;
    action: 'shown' | 'clicked' | 'interacted' | 'completed';
    ai_confidence?: number;
    user_feedback?: 'positive' | 'negative' | 'neutral';
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', `ai_${aiData.feature_type}_${aiData.action}`, {
        event_category: 'AI Features',
        event_label: aiData.feature_type,
        custom_parameter_1: aiData.ai_confidence?.toString() || 'unknown',
        custom_parameter_2: aiData.user_feedback || 'no_feedback',
        value: this.getAIFeatureValue(aiData.action, aiData.ai_confidence)
      });
    }
  }
  
  // Performance and error tracking
  trackPerformanceMetric(performanceData: {
    metric_name: 'page_load_time' | 'search_response_time' | 'api_response_time';
    metric_value: number;
    page_category: string;
    threshold_exceeded?: boolean;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: performanceData.metric_name,
        custom_parameter_1: performanceData.page_category,
        custom_parameter_2: performanceData.threshold_exceeded ? 'slow' : 'fast',
        value: Math.round(performanceData.metric_value)
      });
    }
  }
  
  // Helper methods for value calculation
  private getToolInteractionValue(action: string): number {
    const valueMap = {
      'view': 1,
      'click': 5,
      'bookmark': 10,
      'share': 15
    };
    return valueMap[action as keyof typeof valueMap] || 1;
  }
  
  private getContentEngagementValue(action: string, duration?: number): number {
    const baseValues = {
      'read': duration ? Math.min(duration / 60, 10) : 1, // Value based on reading time
      'share': 20,
      'bookmark': 15,
      'comment': 25
    };
    return Math.round(baseValues[action as keyof typeof baseValues] || 1);
  }
  
  private getAIFeatureValue(action: string, confidence?: number): number {
    const baseValues = {
      'shown': 1,
      'clicked': 5,
      'interacted': 10,
      'completed': 20
    };
    const baseValue = baseValues[action as keyof typeof baseValues] || 1;
    const confidenceMultiplier = confidence ? (confidence * 2) : 1;
    return Math.round(baseValue * confidenceMultiplier);
  }
}

// Export singleton instance
export const ga4Tracker = new GA4EventTracker();
```

### React Hooks for GA4 Tracking

```typescript
// hooks/useGA4Tracking.ts
import { useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ga4Tracker } from '@/lib/analytics/ga4-events';

export const useGA4PageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const handlePageView = () => {
      const pageCategory = getPageCategory(pathname);
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      
      ga4Tracker.trackPageView({
        page_title: document.title,
        page_location: window.location.href,
        page_category: pageCategory,
        content_group1: urlSearchParams.get('category') || undefined,
        content_group2: getUserType(), // Helper to get user type
        content_group3: getSubscriptionTier() // Helper to get subscription tier
      });
    };
    
    // Track initial page view
    handlePageView();
  }, [pathname, searchParams]);
};

export const useGA4Events = () => {
  const trackToolInteraction = useCallback((toolData: {
    tool_id: string;
    tool_name: string;
    tool_category: string;
    action: 'view' | 'click' | 'bookmark' | 'share';
    source: string;
    position?: number;
  }) => {
    ga4Tracker.trackToolInteraction(toolData);
  }, []);
  
  const trackSiteSearch = useCallback((searchData: {
    search_term: string;
    search_category?: string;
    results_count: number;
    filters_applied?: string[];
  }) => {
    ga4Tracker.trackSiteSearch(searchData);
  }, []);
  
  const trackConversion = useCallback((conversionData: {
    conversion_type: 'newsletter_signup' | 'affiliate_click' | 'subscription_start' | 'account_creation';
    conversion_value?: number;
    currency?: string;
    metadata?: Record<string, any>;
  }) => {
    ga4Tracker.trackConversion(conversionData);
  }, []);
  
  return {
    trackToolInteraction,
    trackSiteSearch,
    trackConversion
  };
};

// Helper functions
function getPageCategory(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/tools')) return 'tools';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/news')) return 'news';
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'other';
}

function getUserType(): string {
  // This would be implemented based on your auth system
  const user = localStorage.getItem('user_data');
  if (!user) return 'anonymous';
  try {
    const userData = JSON.parse(user);
    return userData.type || 'registered';
  } catch {
    return 'unknown';
  }
}

function getSubscriptionTier(): string {
  // This would be implemented based on your subscription system
  const user = localStorage.getItem('user_data');
  if (!user) return 'free';
  try {
    const userData = JSON.parse(user);
    return userData.subscription_tier || 'free';
  } catch {
    return 'unknown';
  }
}
```

## 🎯 Conversion Tracking & Goals

### Enhanced Ecommerce Setup

```typescript
// lib/analytics/ga4-ecommerce.ts
class GA4EcommerceTracker {
  // Track affiliate link clicks as "purchases" with $0 value
  trackAffiliateClick(affiliateData: {
    tool_id: string;
    tool_name: string;
    tool_category: string;
    affiliate_partner: string;
    commission_potential: number;
    user_journey_step: string;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track as a conversion event
      window.gtag('event', 'affiliate_click_conversion', {
        event_category: 'Affiliate Marketing',
        event_label: affiliateData.tool_name,
        value: affiliateData.commission_potential,
        currency: 'USD',
        custom_parameter_1: affiliateData.affiliate_partner,
        custom_parameter_2: affiliateData.user_journey_step
      });
      
      // Track as enhanced ecommerce purchase
      window.gtag('event', 'purchase', {
        transaction_id: `aff_${affiliateData.tool_id}_${Date.now()}`,
        value: 0, // No direct revenue, but track potential
        currency: 'USD',
        items: [{
          item_id: affiliateData.tool_id,
          item_name: affiliateData.tool_name,
          item_category: affiliateData.tool_category,
          item_brand: affiliateData.affiliate_partner,
          price: 0,
          quantity: 1,
          custom_parameters: {
            commission_potential: affiliateData.commission_potential,
            click_source: affiliateData.user_journey_step
          }
        }]
      });
    }
  }
  
  // Track newsletter signups
  trackNewsletterSignup(signupData: {
    source: string;
    campaign?: string;
    user_type: 'new' | 'existing';
    interests?: string[];
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'Lead Generation',
        event_label: signupData.source,
        value: 10, // Assign value to newsletter signups
        currency: 'USD',
        custom_parameter_1: signupData.user_type,
        custom_parameter_2: signupData.campaign || 'organic',
        custom_parameter_3: signupData.interests?.join(',') || 'general'
      });
    }
  }
  
  // Track subscription conversions
  trackSubscriptionPurchase(subscriptionData: {
    transaction_id: string;
    plan_id: string;
    plan_name: string;
    price: number;
    currency: string;
    billing_cycle: 'monthly' | 'annual';
    discount_amount?: number;
    coupon_code?: string;
  }) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: subscriptionData.transaction_id,
        value: subscriptionData.price,
        currency: subscriptionData.currency,
        coupon: subscriptionData.coupon_code,
        items: [{
          item_id: subscriptionData.plan_id,
          item_name: subscriptionData.plan_name,
          item_category: 'Subscription',
          item_variant: subscriptionData.billing_cycle,
          price: subscriptionData.price,
          quantity: 1,
          discount: subscriptionData.discount_amount || 0
        }]
      });
      
      // Track subscription start as separate event
      window.gtag('event', 'subscription_start', {
        event_category: 'Revenue',
        event_label: subscriptionData.plan_name,
        value: subscriptionData.price,
        currency: subscriptionData.currency,
        custom_parameter_1: subscriptionData.billing_cycle,
        custom_parameter_2: subscriptionData.coupon_code || 'none'
      });
    }
  }
}

export const ga4EcommerceTracker = new GA4EcommerceTracker();
```

## 📊 Advanced Reporting & Analysis

### Custom Dimensions & Metrics Setup

```typescript
// GA4 Custom Dimensions Configuration
const GA4_CUSTOM_DIMENSIONS = {
  // User dimensions
  user_type: 'custom_parameter_1',           // anonymous, registered, premium
  subscription_tier: 'custom_parameter_2',   // free, pro, enterprise
  user_activity_level: 'custom_parameter_3', // new, casual, active, power_user
  registration_date: 'custom_parameter_4',   // YYYY-MM for cohort analysis
  
  // Content dimensions
  tool_category: 'custom_parameter_5',       // ai-writing, image-generation, etc.
  content_type: 'custom_parameter_6',        // tool, article, project, guide
  search_category: 'custom_parameter_7',     // Category searched within
  page_template: 'custom_parameter_8',       // homepage, tool-page, search-results
  
  // Interaction dimensions
  traffic_source_detail: 'custom_parameter_9', // newsletter, social-twitter, etc.
  conversion_path: 'custom_parameter_10',       // direct, search-tool-convert, etc.
  ai_feature_used: 'custom_parameter_11',       // recommendations, smart-search, etc.
  user_journey_stage: 'custom_parameter_12'     // discovery, evaluation, conversion
};

// Content Groupings for Enhanced Analysis
const GA4_CONTENT_GROUPS = {
  content_group1: 'Tool Categories',    // AI Writing, Image Generation, etc.
  content_group2: 'User Segments',      // New Users, Power Users, etc.
  content_group3: 'Traffic Channels',   // Organic, Social, Direct, etc.
  content_group4: 'Conversion Funnels', // Discovery, Evaluation, Conversion
  content_group5: 'Feature Usage'       // Basic, Advanced, Premium Features
};
```

### Automated Reporting Dashboard

```typescript
// lib/analytics/ga4-reporting.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

class GA4ReportingService {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId: string;
  
  constructor() {
    this.analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: process.env.GA4_SERVICE_ACCOUNT_KEY_PATH,
    });
    this.propertyId = process.env.GA4_PROPERTY_ID!;
  }
  
  async generateToolDiscoveryReport(dateRange: {
    startDate: string;
    endDate: string;
  }) {
    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'customEvent:tool_name' },
        { name: 'customEvent:tool_category' },
        { name: 'eventName' }
      ],
      metrics: [
        { name: 'eventCount' },
        { name: 'eventValue' },
        { name: 'eventCountPerUser' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            value: 'tool_'
          }
        }
      },
      orderBys: [
        {
          metric: { metricName: 'eventCount' },
          desc: true
        }
      ],
      limit: 100
    });
    
    return this.formatToolDiscoveryData(response);
  }
  
  async generateConversionFunnelReport(dateRange: {
    startDate: string;
    endDate: string;
  }) {
    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'customEvent:conversion_type' },
        { name: 'customEvent:user_journey_stage' }
      ],
      metrics: [
        { name: 'eventCount' },
        { name: 'eventValue' },
        { name: 'conversions' }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: ['newsletter_signup', 'affiliate_click', 'subscription_start', 'account_creation']
          }
        }
      }
    });
    
    return this.formatConversionData(response);
  }
  
  async generateUserSegmentAnalysis(dateRange: {
    startDate: string;
    endDate: string;
  }) {
    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${this.propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'customEvent:user_type' },
        { name: 'customEvent:subscription_tier' },
        { name: 'customEvent:user_activity_level' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'engagementRate' },
        { name: 'averageSessionDuration' },
        { name: 'eventCountPerUser' }
      ]
    });
    
    return this.formatUserSegmentData(response);
  }
  
  private formatToolDiscoveryData(response: any) {
    // Format and process the GA4 response data
    return response.rows?.map((row: any) => ({
      toolName: row.dimensionValues[0].value,
      toolCategory: row.dimensionValues[1].value,
      eventType: row.dimensionValues[2].value,
      eventCount: parseInt(row.metricValues[0].value),
      eventValue: parseFloat(row.metricValues[1].value),
      eventsPerUser: parseFloat(row.metricValues[2].value)
    })) || [];
  }
  
  private formatConversionData(response: any) {
    return response.rows?.map((row: any) => ({
      conversionType: row.dimensionValues[0].value,
      journeyStage: row.dimensionValues[1].value,
      conversionCount: parseInt(row.metricValues[0].value),
      conversionValue: parseFloat(row.metricValues[1].value),
      conversionRate: parseFloat(row.metricValues[2].value)
    })) || [];
  }
  
  private formatUserSegmentData(response: any) {
    return response.rows?.map((row: any) => ({
      userType: row.dimensionValues[0].value,
      subscriptionTier: row.dimensionValues[1].value,
      activityLevel: row.dimensionValues[2].value,
      activeUsers: parseInt(row.metricValues[0].value),
      engagementRate: parseFloat(row.metricValues[1].value),
      avgSessionDuration: parseFloat(row.metricValues[2].value),
      eventsPerUser: parseFloat(row.metricValues[3].value)
    })) || [];
  }
}

export const ga4ReportingService = new GA4ReportingService();
```

## 🔧 SEO & Performance Integration

### Search Console Integration

```typescript
// lib/analytics/search-console-integration.ts
export const trackSEOPerformance = () => {
  // Track organic search performance
  const trackOrganicClick = (searchData: {
    query: string;
    page: string;
    position: number;
    device: 'desktop' | 'mobile' | 'tablet';
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'organic_search_click', {
        event_category: 'SEO Performance',
        event_label: searchData.query,
        custom_parameter_1: searchData.page,
        custom_parameter_2: searchData.position.toString(),
        custom_parameter_3: searchData.device,
        value: Math.max(1, 11 - Math.min(searchData.position, 10)) // Higher value for better positions
      });
    }
  };
  
  // Track Core Web Vitals for SEO
  const trackCoreWebVitals = (vitals: {
    cls: number;
    fid: number;
    lcp: number;
    fcp: number;
    ttfb: number;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track each Core Web Vital as a separate event
      Object.entries(vitals).forEach(([metric, value]) => {
        window.gtag('event', 'core_web_vital', {
          event_category: 'Performance',
          event_label: metric.toUpperCase(),
          value: Math.round(value),
          custom_parameter_1: getPerformanceGrade(metric, value),
          custom_parameter_2: window.location.pathname
        });
      });
    }
  };
  
  return { trackOrganicClick, trackCoreWebVitals };
};

function getPerformanceGrade(metric: string, value: number): string {
  const thresholds = {
    cls: { good: 0.1, poor: 0.25 },
    fid: { good: 100, poor: 300 },
    lcp: { good: 2500, poor: 4000 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 }
  };
  
  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs_improvement';
  return 'poor';
}
```

## 🎯 Implementation Checklist

### Phase 1: Basic Setup (Current)
- ✅ GA4 property creation and configuration
- ✅ Privacy-compliant tracking code implementation
- ✅ Consent management integration
- ✅ Basic event tracking for page views and interactions

### Phase 2: Enhanced Tracking (Next 4 weeks)
- ⏳ Custom event implementation for all tool interactions
- ⏳ Enhanced ecommerce setup for affiliate and subscription tracking
- ⏳ Custom dimensions and content grouping configuration
- ⏳ Conversion goal setup and funnel analysis

### Phase 3: Advanced Reporting (Next 8 weeks)
- ⏳ GA4 Reporting API integration
- ⏳ Automated reporting dashboard
- ⏳ Search Console integration for SEO insights
- ⏳ Cross-platform analytics correlation with PostHog

### Phase 4: Optimization (Next 12 weeks)
- ⏳ AI-powered insights from GA4 Intelligence
- ⏳ Predictive analytics implementation
- ⏳ Advanced audience segmentation
- ⏳ Real-time performance monitoring

## 📋 Best Practices Summary

**Privacy & Compliance:**
- Always anonymize IP addresses
- Implement proper consent management
- Use privacy-first measurement techniques
- Regular privacy impact assessments

**Data Quality:**
- Validate event parameters before sending
- Use consistent naming conventions
- Implement data layer management
- Regular data accuracy audits

**Performance:**
- Load GA4 asynchronously
- Minimize tracking code impact
- Use efficient event batching
- Monitor Core Web Vitals impact

**Analysis & Insights:**
- Set up automated reporting
- Create meaningful custom dimensions
- Implement cross-platform analysis
- Focus on actionable metrics

---

*The Google Analytics 4 Setup ensures Tony's Toolbox has comprehensive web analytics capabilities while maintaining user privacy and providing deep insights into traffic patterns, user behavior, and business performance across the AI tool discovery platform.*
