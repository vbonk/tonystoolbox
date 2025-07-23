# Cookie & Privacy Disclaimer - Tony's Toolbox

This document outlines the comprehensive cookie and privacy management system for Tony's Toolbox, ensuring full compliance with GDPR, CCPA, and other privacy regulations while providing transparent user control over data collection and analytics.

## 🍪 Cookie Management Overview

Tony's Toolbox implements a privacy-first approach to cookie management, providing users with granular control over data collection while maintaining essential functionality and improving user experience through analytics insights.

### Cookie Categories & Classification

```typescript
// Cookie Classification System
interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  cookies: CookieDefinition[];
  purposes: CookiePurpose[];
  dataRetention: number; // days
  thirdPartySharing: boolean;
}

// Cookie Definitions
const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    description: 'Necessary for the website to function properly and cannot be disabled.',
    required: true,
    cookies: [
      {
        name: 'supabase-auth-token',
        purpose: 'User authentication and session management',
        duration: '7 days',
        type: 'first-party',
        sensitive: true
      },
      {
        name: 'csrf-token',
        purpose: 'Cross-site request forgery protection',
        duration: 'session',
        type: 'first-party',
        sensitive: false
      }
    ],
    purposes: ['Authentication', 'Security', 'Core Functionality'],
    dataRetention: 7,
    thirdPartySharing: false
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    required: false,
    cookies: [
      {
        name: 'user-preferences',
        purpose: 'Remember user settings and preferences',
        duration: '365 days',
        type: 'first-party',
        sensitive: false
      },
      {
        name: 'theme-preference',
        purpose: 'Remember dark/light mode preference',
        duration: '365 days',
        type: 'first-party',
        sensitive: false
      }
    ],
    purposes: ['Personalization', 'User Experience'],
    dataRetention: 365,
    thirdPartySharing: false
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    required: false,
    cookies: [
      {
        name: 'posthog-session',
        purpose: 'Track user behavior and website performance',
        duration: '30 days',
        type: 'third-party',
        sensitive: false,
        vendor: 'PostHog'
      },
      {
        name: '_ga',
        purpose: 'Google Analytics user identification',
        duration: '2 years',
        type: 'third-party',
        sensitive: false,
        vendor: 'Google'
      }
    ],
    purposes: ['Website Analytics', 'Performance Monitoring'],
    dataRetention: 730,
    thirdPartySharing: true
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    description: 'Used to track visitors across websites for marketing purposes.',
    required: false,
    cookies: [
      {
        name: 'conversion-tracking',
        purpose: 'Track conversion events for marketing optimization',
        duration: '90 days',
        type: 'first-party',
        sensitive: false
      }
    ],
    purposes: ['Marketing Attribution', 'Conversion Tracking'],
    dataRetention: 90,
    thirdPartySharing: false
  }
];
```

## 🔐 Privacy Compliance Framework

### GDPR Compliance Implementation

```typescript
// GDPR Compliance Manager
class GDPRComplianceManager {
  private consentStorage: ConsentStorageService;
  private dataProcessor: DataProcessingService;
  
  async processConsentRequest(
    userId: string,
    consentRequest: ConsentRequest
  ): Promise<ConsentResult> {
    // Validate consent request
    const validation = this.validateConsentRequest(consentRequest);
    if (!validation.isValid) {
      throw new Error(`Invalid consent request: ${validation.errors.join(', ')}`);
    }
    
    // Process consent preferences
    const consentRecord = await this.createConsentRecord(userId, consentRequest);
    
    // Apply consent to data processing
    await this.applyConsentToProcessing(consentRecord);
    
    // Configure analytics based on consent
    await this.configureAnalytics(consentRecord);
    
    // Store consent record for compliance
    await this.consentStorage.storeConsent(consentRecord);
    
    return {
      success: true,
      consentId: consentRecord.id,
      effectiveDate: consentRecord.timestamp,
      appliedSettings: consentRecord.preferences,
      dataRetentionPolicy: this.generateRetentionPolicy(consentRecord)
    };
  }
  
  private async createConsentRecord(
    userId: string,
    request: ConsentRequest
  ): Promise<ConsentRecord> {
    return {
      id: generateConsentId(),
      userId,
      timestamp: new Date(),
      preferences: {
        essential: true, // Always required
        functional: request.functional || false,
        analytics: request.analytics || false,
        marketing: request.marketing || false
      },
      legalBasis: {
        essential: 'legitimate_interest',
        functional: request.functional ? 'consent' : null,
        analytics: request.analytics ? 'consent' : null,
        marketing: request.marketing ? 'consent' : null
      },
      consentMethod: request.method, // 'banner', 'settings', 'api'
      ipAddress: this.hashIP(request.ipAddress),
      userAgent: this.generalizeUserAgent(request.userAgent),
      version: PRIVACY_POLICY_VERSION,
      withdrawalDate: null
    };
  }
  
  async processDataSubjectRights(
    request: DataSubjectRequest
  ): Promise<DataSubjectResponse> {
    switch (request.type) {
      case 'access':
        return this.processAccessRequest(request);
      case 'portability':
        return this.processPortabilityRequest(request);
      case 'rectification':
        return this.processRectificationRequest(request);
      case 'erasure':
        return this.processErasureRequest(request);
      case 'restriction':
        return this.processRestrictionRequest(request);
      case 'objection':
        return this.processObjectionRequest(request);
      default:
        throw new Error(`Unsupported data subject request type: ${request.type}`);
    }
  }
  
  private async processErasureRequest(
    request: DataSubjectRequest
  ): Promise<ErasureResponse> {
    // Validate right to erasure
    const validation = await this.validateErasureRequest(request);
    if (!validation.canErase) {
      return {
        success: false,
        reason: validation.reason,
        legalBasis: validation.legalBasis
      };
    }
    
    // Execute data erasure
    const erasureResult = await this.executeDataErasure(request.userId);
    
    // Notify third parties
    await this.notifyThirdPartyErasure(request.userId);
    
    // Log erasure for compliance
    await this.logErasureActivity(request, erasureResult);
    
    return {
      success: true,
      erasedData: erasureResult.erasedData,
      retainedData: erasureResult.retainedData,
      completionDate: new Date(),
      confirmationId: generateConfirmationId()
    };
  }
}
```

### CCPA Compliance Features

```typescript
// California Consumer Privacy Act (CCPA) Compliance
class CCPAComplianceManager {
  async processDoNotSellRequest(
    userId: string,
    request: DoNotSellRequest
  ): Promise<DoNotSellResponse> {
    // Update user preferences to opt out of sale
    await this.updateUserPrivacySettings(userId, {
      doNotSell: true,
      limitDataSharing: true,
      optOutDate: new Date()
    });
    
    // Configure analytics to respect opt-out
    await this.configureAnalyticsOptOut(userId);
    
    // Notify business partners
    await this.notifyBusinessPartnersOptOut(userId);
    
    return {
      success: true,
      effectiveDate: new Date(),
      confirmationNumber: generateConfirmationNumber(),
      rightsExercised: ['do_not_sell', 'limit_sharing']
    };
  }
  
  async generatePrivacyReport(userId: string): Promise<CCPAPrivacyReport> {
    const userDataCollected = await this.collectUserData(userId);
    const dataSharingActivities = await this.getDataSharingActivities(userId);
    const businessPurposes = await this.getBusinessPurposes(userId);
    
    return {
      reportPeriod: {
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // Last year
        end: new Date()
      },
      personalInformationCollected: this.categorizePersonalInformation(userDataCollected),
      sourcesOfInformation: this.identifyDataSources(userDataCollected),
      businessPurposes: businessPurposes,
      dataSharingDisclosures: dataSharingActivities,
      rightsExercised: await this.getUserRightsHistory(userId),
      retentionSchedule: this.generateRetentionSchedule(userId)
    };
  }
}
```

## 🎯 Cookie Consent Interface

### User-Friendly Consent Banner

```typescript
// Cookie Consent Banner Component
interface CookieConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
  onLearnMore: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onCustomize,
  onLearnMore
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false
  });
  
  useEffect(() => {
    // Check if user has already provided consent
    const existingConsent = getStoredConsent();
    if (!existingConsent) {
      setIsVisible(true);
    }
  }, []);
  
  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    processConsent(allConsent);
    setIsVisible(false);
    onAcceptAll();
  };
  
  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    
    processConsent(essentialOnly);
    setIsVisible(false);
    onRejectAll();
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              We Value Your Privacy
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies to enhance your experience, analyze site usage, and assist in 
              marketing efforts. By clicking "Accept All", you consent to our use of cookies. 
              You can customize your preferences or learn more about our privacy practices.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onLearnMore}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Learn More
            </button>
            
            <button
              onClick={onCustomize}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Customize
            </button>
            
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Reject All
            </button>
            
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Advanced Cookie Preferences Manager

```typescript
// Detailed Cookie Preferences Interface
export const CookiePreferencesModal: React.FC<CookiePreferencesProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false
  });
  
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  
  const toggleCategoryDetails = (categoryId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleSavePreferences = async () => {
    try {
      await processConsent(preferences);
      onSave(preferences);
      onClose();
    } catch (error) {
      console.error('Failed to save cookie preferences:', error);
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
              Cookie Preferences
            </Dialog.Title>
            
            <p className="text-sm text-gray-600 mb-6">
              Manage your cookie preferences below. You can enable or disable different 
              categories of cookies and learn more about what each category does.
            </p>
            
            <div className="space-y-4">
              {COOKIE_CATEGORIES.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {category.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {category.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleCategoryDetails(category.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          {showDetails[category.id] ? 'Hide' : 'Details'}
                        </button>
                        
                        <Switch
                          checked={preferences[category.id as keyof ConsentPreferences]}
                          onChange={(checked) => 
                            setPreferences(prev => ({
                              ...prev,
                              [category.id]: checked
                            }))
                          }
                          disabled={category.required}
                          className={`${
                            preferences[category.id as keyof ConsentPreferences]
                              ? 'bg-blue-600' 
                              : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                        >
                          <span className="sr-only">Toggle {category.name}</span>
                          <span
                            className={`${
                              preferences[category.id as keyof ConsentPreferences]
                                ? 'translate-x-6' 
                                : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                      </div>
                    </div>
                    
                    {showDetails[category.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 mb-1">
                              Purposes
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {category.purposes.map((purpose) => (
                                <span
                                  key={purpose}
                                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                                >
                                  {purpose}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 mb-1">
                              Data Retention
                            </h5>
                            <p className="text-xs text-gray-600">
                              {category.dataRetention} days
                            </p>
                          </div>
                          
                          {category.cookies.length > 0 && (
                            <div>
                              <h5 className="text-xs font-medium text-gray-700 mb-2">
                                Cookies Used
                              </h5>
                              <div className="space-y-2">
                                {category.cookies.map((cookie) => (
                                  <div key={cookie.name} className="text-xs">
                                    <div className="flex justify-between items-start">
                                      <span className="font-mono text-gray-800">
                                        {cookie.name}
                                      </span>
                                      <span className="text-gray-500 ml-2">
                                        {cookie.duration}
                                      </span>
                                    </div>
                                    <p className="text-gray-600 mt-1">
                                      {cookie.purpose}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
```

## 📊 Analytics Privacy Configuration

### PostHog Privacy Settings

```typescript
// PostHog Privacy-Compliant Configuration
class PostHogPrivacyManager {
  static configurePrivacySettings(consentPreferences: ConsentPreferences) {
    if (!consentPreferences.analytics) {
      // Opt out of all tracking
      posthog.opt_out_capturing();
      return;
    }
    
    // Configure privacy-compliant settings
    posthog.set_config({
      // Privacy settings
      respect_dnt: true,
      opt_out_capturing_by_default: false,
      
      // Data collection settings
      capture_pageview: true,
      capture_pageleave: true,
      
      // Session recording with privacy controls
      session_recording: {
        maskAllInputs: true,
        maskAllText: false,
        recordCrossOriginIframes: false,
        maskInputOptions: {
          password: true,
          email: true,
          creditCard: true
        }
      },
      
      // Data retention
      persistence: consentPreferences.functional ? 'localStorage+cookie' : 'memory',
      persistence_name: 'tonystoolbox_ph',
      
      // IP anonymization
      ip: false, // Don't collect IP addresses
      
      // Cross-domain tracking controls  
      cross_subdomain_cookie: false,
      secure_cookie: process.env.NODE_ENV === 'production',
      
      // Data sanitization
      sanitize_properties: (properties: any, event: string) => {
        // Remove PII and sensitive data
        const sanitized = { ...properties };
        
        // Remove common PII fields
        delete sanitized.email;
        delete sanitized.phone;
        delete sanitized.name;
        delete sanitized.address;
        delete sanitized.password;
        
        // Generalize location data
        if (sanitized.location) {
          sanitized.location = this.generalizeLocation(sanitized.location);
        }
        
        return sanitized;
      },
      
      // Property blacklist
      property_blacklist: [
        '$initial_referrer',
        '$initial_referring_domain',
        '$referrer',
        '$referring_domain'
      ]
    });
  }
  
  private static generalizeLocation(location: any): any {
    // Only keep city-level location data
    return {
      city: location.city,
      country: location.country,
      // Remove precise location data
      // lat/lng, postal_code, etc.
    };
  }
}
```

### Google Analytics GDPR Configuration

```typescript
// Google Analytics 4 Privacy Configuration
class GoogleAnalyticsPrivacyManager {
  static configureGA4Privacy(consentPreferences: ConsentPreferences) {
    // Configure consent mode
    gtag('consent', 'default', {
      analytics_storage: consentPreferences.analytics ? 'granted' : 'denied',
      ad_storage: 'denied', // We don't use ads
      functionality_storage: consentPreferences.functional ? 'granted' : 'denied',
      personalization_storage: consentPreferences.functional ? 'granted' : 'denied',
      security_storage: 'granted' // Always required for security
    });
    
    // Configure GA4 with privacy settings
    gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID!, {
      // Privacy settings
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      
      // Data retention
      storage: consentPreferences.analytics ? 'granted' : 'denied',
      
      // Custom configuration
      custom_map: {
        custom_parameter_1: 'user_type',
        custom_parameter_2: 'subscription_tier'
      },
      
      // Debugging (development only)
      debug_mode: process.env.NODE_ENV === 'development'
    });
  }
  
  static updateConsentMode(consentPreferences: ConsentPreferences) {
    gtag('consent', 'update', {
      analytics_storage: consentPreferences.analytics ? 'granted' : 'denied',
      functionality_storage: consentPreferences.functional ? 'granted' : 'denied',
      personalization_storage: consentPreferences.functional ? 'granted' : 'denied'
    });
  }
}
```

## 📋 Privacy Policy Integration

### Automated Privacy Policy Generation

```typescript
// Dynamic Privacy Policy Generator
class PrivacyPolicyGenerator {
  static generatePrivacyPolicy(
    companyInfo: CompanyInfo,
    dataProcessing: DataProcessingInfo,
    cookies: CookieCategory[]
  ): PrivacyPolicy {
    return {
      version: PRIVACY_POLICY_VERSION,
      effectiveDate: new Date(),
      lastUpdated: new Date(),
      
      sections: [
        {
          title: 'Information We Collect',
          content: this.generateDataCollectionSection(dataProcessing),
          subsections: [
            {
              title: 'Personal Information',
              content: this.generatePersonalInfoSection(dataProcessing.personalInfo)
            },
            {
              title: 'Usage Data',
              content: this.generateUsageDataSection(dataProcessing.usageData)
            },
            {
              title: 'Cookies and Tracking',
              content: this.generateCookieSection(cookies)
            }
          ]
        },
        
        {
          title: 'How We Use Your Information',
          content: this.generateUsageSection(dataProcessing.purposes),
          legalBases: this.generateLegalBasesSection(dataProcessing.legalBases)
        },
        
        {
          title: 'Data Sharing and Disclosure',
          content: this.generateSharingSection(dataProcessing.sharing),
          thirdParties: this.generateThirdPartySection(dataProcessing.thirdParties)
        },
        
        {
          title: 'Your Rights and Choices',
          content: this.generateRightsSection(),
          dataSubjectRights: this.generateDataSubjectRightsSection(),
          cookieChoices: this.generateCookieChoicesSection()
        },
        
        {
          title: 'Data Security and Retention',
          content: this.generateSecuritySection(dataProcessing.security),
          retention: this.generateRetentionSection(dataProcessing.retention)
        },
        
        {
          title: 'Contact Information',
          content: this.generateContactSection(companyInfo),
          dpoContact: companyInfo.dpoContact
        }
      ]
    };
  }
}
```

## 🎯 Best Practices & Compliance Checklist

### Privacy Implementation Checklist

**Essential Privacy Controls:**
- ✅ Cookie consent banner with granular controls
- ✅ Privacy policy with clear data processing descriptions
- ✅ Data subject rights request handling
- ✅ Consent withdrawal mechanisms
- ✅ Data minimization practices

**Technical Implementation:**
- ✅ IP address anonymization
- ✅ Data pseudonymization where possible
- ✅ Secure data transmission (HTTPS)
- ✅ Regular privacy impact assessments
- ✅ Audit logs for data processing activities

**User Experience:**
- ✅ Clear, non-technical language in privacy notices
- ✅ Easy-to-find privacy controls
- ✅ Respect for user preferences
- ✅ Transparent data processing notifications
- ✅ Simple consent withdrawal process

**Ongoing Compliance:**
- ✅ Regular privacy policy updates
- ✅ Cookie inventory maintenance
- ✅ Data retention schedule enforcement
- ✅ Third-party vendor privacy assessments
- ✅ Staff privacy training programs

---

*The Cookie & Privacy Disclaimer ensures Tony's Toolbox maintains full compliance with global privacy regulations while providing users with transparent, granular control over their personal data and privacy preferences.*
