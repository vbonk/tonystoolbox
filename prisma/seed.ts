import { PrismaClient } from '@prisma/client'
import type {
  UserRole,
  SubscriptionTier,
  ToolCategory,
  PricingModel,
  ToolStatus,
  ProjectCategory,
  DifficultyLevel,
  EmbedType,
  ProjectStatus,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tonystoolbox.com' },
    update: {},
    create: {
      clerkId: 'user_admin_123',
      email: 'admin@tonystoolbox.com',
      username: 'tony_admin',
      firstName: 'Tony',
      lastName: 'Admin',
      role: 'ADMIN' as UserRole,
      subscriptionTier: 'ENTERPRISE' as SubscriptionTier,
      preferences: {
        theme: 'dark',
        notifications: true,
        newsletter: true,
      },
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      clerkId: 'user_test_456',
      email: 'user@example.com',
      username: 'test_user',
      firstName: 'Test',
      lastName: 'User',
      role: 'SUBSCRIBER' as UserRole,
      subscriptionTier: 'PRO' as SubscriptionTier,
      preferences: {
        theme: 'light',
        notifications: false,
        newsletter: true,
      },
    },
  })

  // Create sample AI tools
  const tools = [
    {
      slug: 'chatgpt-plus',
      name: 'ChatGPT Plus',
      description: 'Advanced AI assistant with enhanced capabilities and priority access',
      longDescription: 'ChatGPT Plus offers enhanced AI assistance with faster response times, priority access during peak usage, and access to the latest features and improvements.',
      category: 'AI_WRITING' as ToolCategory,
      subcategory: 'Conversational AI',
      tags: ['ai', 'chat', 'writing', 'assistant'],
      websiteUrl: 'https://chat.openai.com',
      logoUrl: '/images/tools/chatgpt-logo.png',
      screenshotUrl: '/images/tools/chatgpt-screenshot.png',
      affiliateUrl: 'https://chat.openai.com/auth/login?ref=tonystoolbox',
      pricing: 'SUBSCRIPTION' as PricingModel,
      startingPrice: 20.0,
      currency: 'USD',
      featured: true,
      verified: true,
      popularity: 95,
      rating: 4.8,
      totalReviews: 1250,
      status: 'PUBLISHED' as ToolStatus,
      publishedAt: new Date(),
    },
    {
      slug: 'github-copilot',
      name: 'GitHub Copilot',
      description: 'AI-powered code completion and programming assistant',
      longDescription: 'GitHub Copilot uses OpenAI technology to provide intelligent code suggestions, helping developers write code faster and with fewer errors.',
      category: 'AI_CODING' as ToolCategory,
      subcategory: 'Code Assistance',
      tags: ['coding', 'ai', 'development', 'vscode'],
      websiteUrl: 'https://github.com/features/copilot',
      logoUrl: '/images/tools/copilot-logo.png',
      screenshotUrl: '/images/tools/copilot-screenshot.png',
      affiliateUrl: 'https://github.com/features/copilot?ref=tonystoolbox',
      pricing: 'SUBSCRIPTION' as PricingModel,
      startingPrice: 10.0,
      currency: 'USD',
      featured: true,
      verified: true,
      popularity: 88,
      rating: 4.6,
      totalReviews: 890,
      status: 'PUBLISHED' as ToolStatus,
      publishedAt: new Date(),
    },
    {
      slug: 'midjourney',
      name: 'Midjourney',
      description: 'AI-powered image generation and creative design tool',
      longDescription: 'Midjourney creates stunning, high-quality images from text prompts using advanced AI models, perfect for artists, designers, and content creators.',
      category: 'AI_DESIGN' as ToolCategory,
      subcategory: 'Image Generation',
      tags: ['ai', 'design', 'images', 'creative'],
      websiteUrl: 'https://midjourney.com',
      logoUrl: '/images/tools/midjourney-logo.png',
      screenshotUrl: '/images/tools/midjourney-screenshot.png',
      affiliateUrl: 'https://midjourney.com?ref=tonystoolbox',
      pricing: 'SUBSCRIPTION' as PricingModel,
      startingPrice: 10.0,
      currency: 'USD',
      featured: true,
      verified: true,
      popularity: 92,
      rating: 4.7,
      totalReviews: 2100,
      status: 'PUBLISHED' as ToolStatus,
      publishedAt: new Date(),
    },
    {
      slug: 'notion-ai',
      name: 'Notion AI',
      description: 'Intelligent writing assistant built into Notion workspace',
      longDescription: 'Notion AI enhances your productivity by providing writing assistance, content generation, and intelligent suggestions directly within your Notion workspace.',
      category: 'AI_PRODUCTIVITY' as ToolCategory,
      subcategory: 'Workspace Enhancement',
      tags: ['productivity', 'writing', 'workspace', 'ai'],
      websiteUrl: 'https://notion.so/product/ai',
      logoUrl: '/images/tools/notion-logo.png',
      screenshotUrl: '/images/tools/notion-ai-screenshot.png',
      affiliateUrl: 'https://notion.so/product/ai?ref=tonystoolbox',
      pricing: 'FREEMIUM' as PricingModel,
      startingPrice: 8.0,
      currency: 'USD',
      featured: false,
      verified: true,
      popularity: 78,
      rating: 4.4,
      totalReviews: 650,
      status: 'PUBLISHED' as ToolStatus,
      publishedAt: new Date(),
    },
  ]

  const createdTools = []
  for (const tool of tools) {
    const createdTool = await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: {},
      create: tool,
    })
    createdTools.push(createdTool)
  }

  // Create sample projects
  const projects = [
    {
      slug: 'ai-content-generator',
      title: 'AI Content Generator',
      description: 'A powerful AI-driven content creation tool for marketers and content creators',
      longDescription: 'This project demonstrates how to build a comprehensive content generation system using multiple AI models to create blog posts, social media content, and marketing copy.',
      category: 'MARKETING_TOOLS' as ProjectCategory,
      tags: ['ai', 'content', 'marketing', 'automation'],
      difficulty: 'INTERMEDIATE' as DifficultyLevel,
      thumbnailUrl: '/images/projects/content-generator-thumb.png',
      imageUrls: ['/images/projects/content-generator-1.png', '/images/projects/content-generator-2.png'],
      embedType: 'CUSTOM_GPT' as EmbedType,
      embedUrl: 'https://chat.openai.com/g/g-example',
      embedConfig: {
        height: 600,
        allowFullscreen: true,
        sandbox: 'allow-scripts allow-same-origin',
      },
      techStack: ['Next.js', 'OpenAI API', 'TailwindCSS', 'Prisma'],
      githubUrl: 'https://github.com/example/ai-content-generator',
      featured: true,
      views: 1250,
      likes: 89,
      status: 'PUBLISHED' as ProjectStatus,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      slug: 'smart-analytics-dashboard',
      title: 'Smart Analytics Dashboard',
      description: 'Real-time analytics dashboard with AI-powered insights and predictions',
      longDescription: 'A comprehensive analytics platform that not only displays data but uses AI to provide actionable insights and predictive analytics for business decision-making.',
      category: 'ANALYTICS_DASHBOARDS' as ProjectCategory,
      tags: ['analytics', 'dashboard', 'ai', 'predictions'],
      difficulty: 'ADVANCED' as DifficultyLevel,
      thumbnailUrl: '/images/projects/analytics-dashboard-thumb.png',
      imageUrls: ['/images/projects/analytics-dashboard-1.png'],
      embedType: 'DEMO' as EmbedType,
      demoUrl: 'https://demo.tonystoolbox.com/analytics',
      techStack: ['React', 'D3.js', 'Python', 'TensorFlow', 'PostgreSQL'],
      featured: true,
      views: 890,
      likes: 67,
      status: 'PUBLISHED' as ProjectStatus,
      publishedAt: new Date(),
      authorId: adminUser.id,
    },
    {
      slug: 'automated-workflow-builder',
      title: 'Automated Workflow Builder',
      description: 'Visual workflow automation tool with AI optimization suggestions',
      longDescription: 'Build complex automation workflows with a drag-and-drop interface, enhanced with AI suggestions for optimization and error prevention.',
      category: 'AUTOMATION_TOOLS' as ProjectCategory,
      tags: ['automation', 'workflow', 'no-code', 'ai'],
      difficulty: 'INTERMEDIATE' as DifficultyLevel,
      thumbnailUrl: '/images/projects/workflow-builder-thumb.png',
      imageUrls: ['/images/projects/workflow-builder-1.png', '/images/projects/workflow-builder-2.png'],
      embedType: 'INTERACTIVE' as EmbedType,
      demoUrl: 'https://demo.tonystoolbox.com/workflow-builder',
      techStack: ['Vue.js', 'Node.js', 'MongoDB', 'Zapier API'],
      featured: false,
      views: 620,
      likes: 45,
      status: 'PUBLISHED' as ProjectStatus,
      publishedAt: new Date(),
      authorId: testUser.id,
    },
  ]

  const createdProjects = []
  for (const project of projects) {
    const createdProject = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
    createdProjects.push(createdProject)
  }

  // Create sample reviews
  const reviews = [
    {
      rating: 5,
      title: 'Excellent AI assistant',
      content: 'ChatGPT Plus has transformed how I work. The responses are incredibly helpful and the priority access is worth every penny.',
      userId: testUser.id,
      toolId: createdTools[0].id,
      approved: true,
    },
    {
      rating: 4,
      title: 'Great for coding',
      content: 'GitHub Copilot saves me hours of coding time. Sometimes the suggestions need tweaking but overall very helpful.',
      userId: testUser.id,
      toolId: createdTools[1].id,
      approved: true,
    },
    {
      rating: 5,
      title: 'Amazing image quality',
      content: 'Midjourney creates stunning images that would take me hours to design manually. Highly recommended for creative work.',
      userId: adminUser.id,
      toolId: createdTools[2].id,
      approved: true,
    },
  ]

  for (const review of reviews) {
    await prisma.review.upsert({
      where: {
        userId_toolId: {
          userId: review.userId,
          toolId: review.toolId!,
        },
      },
      update: {},
      create: review,
    })
  }

  // Create sample short links
  const shortLinks = [
    {
      slug: 'chatgpt',
      originalUrl: 'https://chat.openai.com?ref=tonystoolbox',
      shortUrl: 'https://tonystoolbox.com/go/chatgpt',
      title: 'ChatGPT Plus',
      description: 'Try ChatGPT Plus with priority access',
      clicks: 145,
      creatorId: adminUser.id,
    },
    {
      slug: 'copilot',
      originalUrl: 'https://github.com/features/copilot?ref=tonystoolbox',
      shortUrl: 'https://tonystoolbox.com/go/copilot',
      title: 'GitHub Copilot',
      description: 'AI-powered coding assistant',
      clicks: 89,
      creatorId: adminUser.id,
    },
  ]

  for (const shortLink of shortLinks) {
    await prisma.shortLink.upsert({
      where: { slug: shortLink.slug },
      update: {},
      create: shortLink,
    })
  }

  // Create sample system configuration
  const systemConfigs = [
    {
      key: 'site_name',
      value: "Tony's Toolbox",
      type: 'STRING' as const,
      description: 'The name of the website',
    },
    {
      key: 'enable_analytics',
      value: 'true',
      type: 'BOOLEAN' as const,
      description: 'Enable analytics tracking',
    },
    {
      key: 'max_tools_per_page',
      value: '20',
      type: 'NUMBER' as const,
      description: 'Maximum number of tools to display per page',
    },
    {
      key: 'affiliate_disclaimer',
      value: 'Some links on this site may be affiliate links. We may earn a commission if you make a purchase.',
      type: 'STRING' as const,
      description: 'Affiliate disclaimer text',
    },
  ]

  for (const config of systemConfigs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   • ${2} users`)
  console.log(`   • ${createdTools.length} tools`)
  console.log(`   • ${createdProjects.length} projects`)
  console.log(`   • ${reviews.length} reviews`)
  console.log(`   • ${shortLinks.length} short links`)
  console.log(`   • ${systemConfigs.length} system configs`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })