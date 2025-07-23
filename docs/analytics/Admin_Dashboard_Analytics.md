# Admin Analytics Dashboard - Tony's Toolbox

This document outlines the comprehensive admin analytics dashboard implementation for Tony's Toolbox, providing secure access to business intelligence, user behavior insights, and operational metrics for administrative users.

## 🎯 Dashboard Overview

The admin analytics dashboard serves as the central command center for Tony's Toolbox administrators, offering real-time insights into user behavior, business performance, and system health through integrated analytics platforms and custom metrics.

### Dashboard Architecture

```typescript
// Admin Dashboard Architecture
interface AdminDashboardArchitecture {
  authentication: AdminAuthService;
  dataAggregation: MetricsAggregationService;
  visualization: ChartRenderingService;
  realTimeUpdates: WebSocketService;
  exportCapabilities: DataExportService;
  alerting: AdminAlertingService;
}

// Dashboard Configuration
interface DashboardConfig {
  refreshInterval: number; // milliseconds
  metricsRetentionPeriod: number; // days
  realTimeDataSources: DataSource[];
  cachedMetricsTTL: number; // seconds
  userPermissions: AdminPermission[];
}

// Admin Dashboard Component Interface
interface AdminDashboard {
  userMetrics: UserAnalyticsDashboard;
  businessMetrics: BusinessIntelligenceDashboard;
  technicalMetrics: SystemHealthDashboard;
  contentMetrics: ContentPerformanceDashboard;
  securityMetrics: SecurityMonitoringDashboard;
}
```

## 🔐 Authentication & Access Control

### Role-Based Access System

```typescript
// Admin Authentication Service
class AdminAuthService {
  private supabase: SupabaseClient;
  
  async validateAdminAccess(userId: string): Promise<AdminAccessResult> {
    // Fetch user with role metadata
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*, user_metadata')
      .eq('id', userId)
      .single();
    
    if (error || !user) {
      return {
        hasAccess: false,
        reason: 'User not found',
        redirectTo: '/login'
      };
    }
    
    // Check admin role in metadata
    const userRole = user.user_metadata?.role;
    const adminRoles = ['admin', 'super_admin', 'analytics_admin'];
    
    if (!adminRoles.includes(userRole)) {
      return {
        hasAccess: false,
        reason: 'Insufficient permissions',
        redirectTo: '/'
      };
    }
    
    // Validate session freshness (require re-auth for sensitive operations)
    const sessionAge = Date.now() - new Date(user.last_sign_in_at).getTime();
    const maxSessionAge = 4 * 60 * 60 * 1000; // 4 hours
    
    if (sessionAge > maxSessionAge) {
      return {
        hasAccess: false,
        reason: 'Session expired',
        redirectTo: '/admin/reauth'
      };
    }
    
    return {
      hasAccess: true,
      userRole,
      permissions: this.getAdminPermissions(userRole),
      sessionExpiresAt: new Date(Date.now() + maxSessionAge)
    };
  }
  
  private getAdminPermissions(role: string): AdminPermission[] {
    const permissionMap: Record<string, AdminPermission[]> = {
      'analytics_admin': [
        'view_user_metrics',
        'view_business_metrics',
        'export_basic_reports'
      ],
      'admin': [
        'view_user_metrics',
        'view_business_metrics',
        'view_system_health',
        'manage_users',
        'export_detailed_reports'
      ],
      'super_admin': [
        'view_all_metrics',
        'manage_all_users',
        'system_administration',
        'security_monitoring',
        'export_all_data',
        'manage_admin_users'
      ]
    };
    
    return permissionMap[role] || [];
  }
}

// Admin Route Protection Middleware
export const withAdminAuth = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authService = new AdminAuthService();
    const userId = req.headers.authorization?.replace('Bearer ', '');
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const accessResult = await authService.validateAdminAccess(userId);
    
    if (!accessResult.hasAccess) {
      return res.status(403).json({ 
        error: 'Access denied', 
        reason: accessResult.reason,
        redirectTo: accessResult.redirectTo 
      });
    }
    
    // Add admin context to request
    (req as any).adminContext = {
      userId,
      role: accessResult.userRole,
      permissions: accessResult.permissions
    };
    
    return handler(req, res);
  };
};
```

### Dashboard Route Implementation

```typescript
// pages/admin/analytics/index.tsx
import { useState, useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { MetricsDashboard } from '@/components/admin/MetricsDashboard';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminAnalyticsPage() {
  const user = useUser();
  const { isAdmin, permissions, loading, error } = useAdminAuth();
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date()
  });
  
  if (loading) {
    return <AdminLoadingSpinner />;
  }
  
  if (error || !isAdmin) {
    return <AdminAccessDenied error={error} />;
  }
  
  return (
    <AdminDashboardLayout user={user} permissions={permissions}>
      <div className="space-y-6">
        <DashboardHeader
          title="Analytics Dashboard"
          dateRange={selectedDateRange}
          onDateRangeChange={setSelectedDateRange}
        />
        
        <MetricsDashboard
          dateRange={selectedDateRange}
          permissions={permissions}
          refreshInterval={30000} // 30 seconds
        />
      </div>
    </AdminDashboardLayout>
  );
}

// Custom hook for admin authentication
function useAdminAuth() {
  const user = useUser();
  const [authState, setAuthState] = useState({
    isAdmin: false,
    permissions: [],
    loading: true,
    error: null
  });
  
  useEffect(() => {
    async function validateAdmin() {
      if (!user) {
        setAuthState({
          isAdmin: false,
          permissions: [],
          loading: false,
          error: 'Authentication required'
        });
        return;
      }
      
      try {
        const authService = new AdminAuthService();
        const result = await authService.validateAdminAccess(user.id);
        
        setAuthState({
          isAdmin: result.hasAccess,
          permissions: result.permissions || [],
          loading: false,
          error: result.hasAccess ? null : result.reason
        });
      } catch (error) {
        setAuthState({
          isAdmin: false,
          permissions: [],
          loading: false,
          error: 'Authentication validation failed'
        });
      }
    }
    
    validateAdmin();
  }, [user]);
  
  return authState;
}
```

## 📊 Dashboard Components & Metrics

### User Analytics Dashboard

```typescript
// User Analytics Component
interface UserAnalyticsProps {
  dateRange: DateRange;
  permissions: AdminPermission[];
}

export const UserAnalyticsDashboard: React.FC<UserAnalyticsProps> = ({
  dateRange,
  permissions
}) => {
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUserMetrics() {
      try {
        const response = await fetch('/api/admin/metrics/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dateRange, permissions })
        });
        
        const data = await response.json();
        setUserMetrics(data);
      } catch (error) {
        console.error('Failed to fetch user metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserMetrics();
    
    // Set up real-time updates
    const interval = setInterval(fetchUserMetrics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dateRange, permissions]);
  
  if (loading) return <MetricsLoadingSkeleton />;
  if (!userMetrics) return <MetricsErrorState />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Key User Metrics */}
      <MetricCard
        title="Total Users"
        value={userMetrics.totalUsers}
        change={userMetrics.userGrowth}
        trend={userMetrics.userGrowthTrend}
        icon={<UsersIcon />}
      />
      
      <MetricCard
        title="Active Users (30d)"
        value={userMetrics.monthlyActiveUsers}
        change={userMetrics.mauGrowth}
        trend={userMetrics.mauTrend}
        icon={<ActivityIcon />}
      />
      
      <MetricCard
        title="New Signups"
        value={userMetrics.newSignups}
        change={userMetrics.signupGrowth}
        trend={userMetrics.signupTrend}
        icon={<UserPlusIcon />}
      />
      
      <MetricCard
        title="User Retention"
        value={`${userMetrics.retentionRate}%`}
        change={userMetrics.retentionChange}
        trend={userMetrics.retentionTrend}
        icon={<RepeatIcon />}
      />
      
      {/* Detailed Analytics Charts */}
      <div className="md:col-span-2 lg:col-span-4">
        <ChartContainer title="User Growth Over Time">
          <UserGrowthChart data={userMetrics.growthData} />
        </ChartContainer>
      </div>
      
      <div className="md:col-span-2">
        <ChartContainer title="User Acquisition Channels">
          <AcquisitionChannelChart data={userMetrics.acquisitionData} />
        </ChartContainer>
      </div>
      
      <div className="md:col-span-2">
        <ChartContainer title="User Engagement Metrics">
          <EngagementMetricsChart data={userMetrics.engagementData} />
        </ChartContainer>
      </div>
    </div>
  );
};
```

### Business Intelligence Dashboard

```typescript
// Business Metrics Component
export const BusinessIntelligenceDashboard: React.FC<BusinessAnalyticsProps> = ({
  dateRange,
  permissions
}) => {
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  
  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Monthly Revenue"
          value={`$${businessMetrics?.monthlyRevenue.toLocaleString()}`}
          change={businessMetrics?.revenueGrowth}
          trend={businessMetrics?.revenueTrend}
          icon={<DollarSignIcon />}
        />
        
        <MetricCard
          title="Conversion Rate"
          value={`${businessMetrics?.conversionRate}%`}
          change={businessMetrics?.conversionChange}
          trend={businessMetrics?.conversionTrend}
          icon={<TrendingUpIcon />}
        />
        
        <MetricCard
          title="Avg. Revenue Per User"
          value={`$${businessMetrics?.arpu}`}
          change={businessMetrics?.arpuChange}
          trend={businessMetrics?.arpuTrend}
          icon={<CreditCardIcon />}
        />
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Revenue Trends">
          <RevenueChart data={businessMetrics?.revenueData} />
        </ChartContainer>
        
        <ChartContainer title="Subscription Metrics">
          <SubscriptionChart data={businessMetrics?.subscriptionData} />
        </ChartContainer>
      </div>
      
      {/* Top Performing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingTools data={businessMetrics?.topTools} />
        <TopAffiliateLinks data={businessMetrics?.topAffiliates} />
      </div>
    </div>
  );
};
```

### System Health Dashboard

```typescript
// System Health Monitoring
export const SystemHealthDashboard: React.FC<SystemHealthProps> = ({
  permissions
}) => {
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics | null>(null);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  
  useEffect(() => {
    // Real-time system health monitoring
    const healthSocket = new WebSocket(process.env.NEXT_PUBLIC_HEALTH_WS!);
    
    healthSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'health_metrics') {
        setHealthMetrics(data.metrics);
      } else if (data.type === 'system_alert') {
        setAlerts(prev => [data.alert, ...prev.slice(0, 9)]); // Keep last 10 alerts
      }
    };
    
    return () => healthSocket.close();
  }, []);
  
  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SystemStatusCard
          title="API Response Time"
          value={`${healthMetrics?.apiResponseTime}ms`}
          status={healthMetrics?.apiStatus}
          threshold={2000}
        />
        
        <SystemStatusCard
          title="Database Performance"
          value={`${healthMetrics?.dbResponseTime}ms`}
          status={healthMetrics?.dbStatus}
          threshold={500}
        />
        
        <SystemStatusCard
          title="Error Rate"
          value={`${healthMetrics?.errorRate}%`}
          status={healthMetrics?.errorStatus}
          threshold={1}
        />
        
        <SystemStatusCard
          title="Uptime"
          value={`${healthMetrics?.uptime}%`}
          status={healthMetrics?.uptimeStatus}
          threshold={99.9}
        />
      </div>
      
      {/* Active Alerts */}
      {alerts.length > 0 && (
        <AlertsPanel alerts={alerts} onDismissAlert={dismissAlert} />
      )}
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Response Time Trends">
          <ResponseTimeChart data={healthMetrics?.responseTimeData} />
        </ChartContainer>
        
        <ChartContainer title="Error Rate Analysis">
          <ErrorRateChart data={healthMetrics?.errorData} />
        </ChartContainer>
      </div>
    </div>
  );
};
```

## 🔌 PostHog Integration

### Embedded PostHog Dashboards

```typescript
// PostHog Dashboard Embedding
export const PostHogDashboardEmbed: React.FC<PostHogEmbedProps> = ({
  dashboardId,
  height = '600px',
  permissions
}) => {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  
  useEffect(() => {
    async function generateEmbedUrl() {
      try {
        const response = await fetch('/api/admin/posthog/embed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            dashboardId, 
            permissions,
            userId: user?.id 
          })
        });
        
        const { embedUrl: url } = await response.json();
        setEmbedUrl(url);
      } catch (error) {
        console.error('Failed to generate PostHog embed URL:', error);
      }
    }
    
    generateEmbedUrl();
  }, [dashboardId, permissions]);
  
  if (!embedUrl) {
    return <EmbedLoadingSkeleton height={height} />;
  }
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        className="w-full"
        title={`PostHog Dashboard ${dashboardId}`}
      />
    </div>
  );
};

// PostHog Embed API Handler
// pages/api/admin/posthog/embed.ts
export default withAdminAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const { dashboardId, permissions, userId } = req.body;
  
  try {
    // Generate secure embed token
    const embedToken = await generatePostHogEmbedToken({
      dashboardId,
      userId,
      permissions,
      expiresIn: 3600 // 1 hour
    });
    
    const embedUrl = `${process.env.POSTHOG_HOST}/embed/${dashboardId}?token=${embedToken}`;
    
    res.status(200).json({ embedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate embed URL' });
  }
});
```

## 📈 Real-Time Updates & WebSocket Integration

### Live Metrics Streaming

```typescript
// Real-time metrics service
class RealTimeMetricsService {
  private websocket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  connect(userId: string, permissions: AdminPermission[]) {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/admin/metrics?userId=${userId}&permissions=${permissions.join(',')}`;
    
    this.websocket = new WebSocket(wsUrl);
    
    this.websocket.onopen = () => {
      console.log('Connected to real-time metrics');
      this.reconnectAttempts = 0;
    };
    
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMetricsUpdate(data);
    };
    
    this.websocket.onclose = () => {
      this.handleReconnection();
    };
    
    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  
  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect(userId, permissions);
      }, Math.pow(2, this.reconnectAttempts) * 1000); // Exponential backoff
    }
  }
  
  private handleMetricsUpdate(data: MetricsUpdate) {
    // Emit events for different metric types
    switch (data.type) {
      case 'user_metrics':
        this.emitEvent('userMetricsUpdate', data.metrics);
        break;
      case 'business_metrics':
        this.emitEvent('businessMetricsUpdate', data.metrics);
        break;
      case 'system_health':
        this.emitEvent('systemHealthUpdate', data.metrics);
        break;
      case 'alert':
        this.emitEvent('systemAlert', data.alert);
        break;
    }
  }
}
```

## 📊 Data Export & Reporting

### Comprehensive Data Export System

```typescript
// Data export service
class AdminDataExportService {
  async exportMetrics(
    exportConfig: ExportConfig,
    adminContext: AdminContext
  ): Promise<ExportResult> {
    // Validate permissions
    if (!this.hasExportPermission(exportConfig.dataType, adminContext.permissions)) {
      throw new Error('Insufficient permissions for export');
    }
    
    // Generate export based on type
    switch (exportConfig.format) {
      case 'csv':
        return this.exportToCSV(exportConfig, adminContext);
      case 'json':
        return this.exportToJSON(exportConfig, adminContext);
      case 'pdf':
        return this.exportToPDF(exportConfig, adminContext);
      default:
        throw new Error('Unsupported export format');
    }
  }
  
  private async exportToCSV(
    config: ExportConfig,
    context: AdminContext
  ): Promise<CSVExportResult> {
    const data = await this.fetchExportData(config, context);
    const csv = this.convertToCSV(data);
    
    // Upload to secure storage
    const fileUrl = await this.uploadExportFile(csv, 'text/csv', context.userId);
    
    // Log export activity
    await this.logExportActivity({
      userId: context.userId,
      dataType: config.dataType,
      format: 'csv',
      recordCount: data.length,
      fileUrl
    });
    
    return {
      success: true,
      fileUrl,
      recordCount: data.length,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
  }
}
```

## 🎯 Implementation Roadmap

### Phase 1: Core Dashboard (Current)
- ✅ Admin authentication and role-based access
- ✅ Basic metrics display and user analytics
- 🔄 PostHog dashboard embedding
- 🔄 Real-time metrics updates

### Phase 2: Advanced Analytics (Next 6 weeks)
- ⏳ Business intelligence dashboard
- ⏳ System health monitoring
- ⏳ Advanced data export capabilities
- ⏳ Custom report generation

### Phase 3: Predictive Analytics (3 months)
- ⏳ AI-powered insights and recommendations
- ⏳ Automated alerting and anomaly detection
- ⏳ Advanced user segmentation
- ⏳ Predictive business modeling

### Phase 4: Enterprise Features (6 months)
- ⏳ Multi-tenant dashboard management
- ⏳ Advanced security and audit logging
- ⏳ Custom dashboard builder
- ⏳ API access for external integrations

---

*The Admin Analytics Dashboard provides Tony's Toolbox administrators with comprehensive, real-time insights into user behavior, business performance, and system health through secure, role-based access controls and integrated analytics platforms.*
