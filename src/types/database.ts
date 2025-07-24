import type {
  User,
  Tool,
  Project,
  ShortLink,
  NewsItem,
  UserInteraction,
  Review,
  UserFavorite,
  AnalyticsEvent,
  SystemConfig,
  UserRole,
  SubscriptionTier,
  ToolCategory,
  PricingModel,
  ToolStatus,
  ProjectCategory,
  DifficultyLevel,
  EmbedType,
  ProjectStatus,
  NewsCategory,
  InteractionType,
  EntityType,
  AnalyticsEventType,
  ConfigType,
} from '@prisma/client'

// Export all Prisma types
export type {
  User,
  Tool,
  Project,
  ShortLink,
  NewsItem,
  UserInteraction,
  Review,
  UserFavorite,
  AnalyticsEvent,
  SystemConfig,
  UserRole,
  SubscriptionTier,
  ToolCategory,
  PricingModel,
  ToolStatus,
  ProjectCategory,
  DifficultyLevel,
  EmbedType,
  ProjectStatus,
  NewsCategory,
  InteractionType,
  EntityType,
  AnalyticsEventType,
  ConfigType,
}

// Enhanced types with relations
export type UserWithRelations = User & {
  projects: Project[]
  userInteractions: UserInteraction[]
  shortLinks: ShortLink[]
  favorites: UserFavorite[]
  reviews: Review[]
}

export type ToolWithRelations = Tool & {
  reviews: Review[]
  userInteractions: UserInteraction[]
  favorites: UserFavorite[]
}

export type ProjectWithRelations = Project & {
  author: User
  userInteractions: UserInteraction[]
  favorites: UserFavorite[]
}

export type ReviewWithRelations = Review & {
  user: User
  tool?: Tool
}

// API Response types
export type ToolsResponse = {
  tools: ToolWithRelations[]
  totalCount: number
  hasNextPage: boolean
}

export type ProjectsResponse = {
  projects: ProjectWithRelations[]
  totalCount: number
  hasNextPage: boolean
}

// Filter and search types
export type ToolFilters = {
  category?: ToolCategory
  pricing?: PricingModel
  featured?: boolean
  verified?: boolean
  search?: string
  tags?: string[]
}

export type ProjectFilters = {
  category?: ProjectCategory
  difficulty?: DifficultyLevel
  featured?: boolean
  search?: string
  tags?: string[]
  authorId?: string
}

// Pagination types
export type PaginationParams = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Analytics types
export type AnalyticsData = {
  totalUsers: number
  totalTools: number
  totalProjects: number
  totalInteractions: number
  topTools: ToolWithRelations[]
  topProjects: ProjectWithRelations[]
  recentActivity: UserInteraction[]
}