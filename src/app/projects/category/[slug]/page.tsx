'use client'

import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import { AnimatedCard, ProjectCard, FeatureCard } from '@/components/ui/animated-card'
import { SearchFilter, SortFilter } from '@/components/ui/category-filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Category definitions with rich metadata
const CATEGORY_DATA = {
  'ai-tools': {
    name: 'AI Tools',
    icon: '🤖',
    description: 'Intelligent AI assistants and machine learning solutions',
    longDescription:
      'Explore our comprehensive collection of AI-powered tools designed to enhance productivity, creativity, and decision-making. From natural language processing to computer vision, these tools leverage cutting-edge artificial intelligence to solve complex problems.',
    color: 'from-blue-500 to-purple-600',
    bgColor: 'from-blue-500/10 to-purple-600/10',
    features: [
      'Natural Language Processing',
      'Machine Learning Models',
      'Automated Decision Making',
      'Pattern Recognition',
    ],
    stats: { projects: 15, users: '2.5K+', satisfaction: '98%' },
  },
  analytics: {
    name: 'Analytics',
    icon: '📊',
    description: 'Data analysis and business intelligence platforms',
    longDescription:
      'Transform raw data into actionable insights with our powerful analytics tools. Built for data scientists, business analysts, and decision-makers who need to understand trends, predict outcomes, and optimize performance.',
    color: 'from-green-500 to-teal-600',
    bgColor: 'from-green-500/10 to-teal-600/10',
    features: [
      'Real-time Dashboards',
      'Predictive Analytics',
      'Data Visualization',
      'Statistical Analysis',
    ],
    stats: { projects: 12, users: '1.8K+', satisfaction: '96%' },
  },
  automation: {
    name: 'Automation',
    icon: '⚡',
    description: 'Workflow automation and process optimization tools',
    longDescription:
      'Streamline your operations with intelligent automation solutions. Eliminate repetitive tasks, reduce errors, and increase efficiency with our suite of automation tools designed for modern businesses.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-500/10 to-red-600/10',
    features: ['Process Automation', 'Integration APIs', 'Scheduled Tasks', 'Error Handling'],
    stats: { projects: 8, users: '1.2K+', satisfaction: '97%' },
  },
  marketing: {
    name: 'Marketing',
    icon: '📈',
    description: 'Digital marketing and content creation solutions',
    longDescription:
      'Supercharge your marketing efforts with AI-powered content creation, campaign optimization, and customer insights. Perfect for marketers, content creators, and growth teams.',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-500/10 to-rose-600/10',
    features: ['Content Generation', 'Campaign Optimization', 'A/B Testing', 'Customer Insights'],
    stats: { projects: 10, users: '3.1K+', satisfaction: '94%' },
  },
  development: {
    name: 'Development',
    icon: '💻',
    description: 'Developer tools and code optimization solutions',
    longDescription:
      'Enhance your development workflow with intelligent coding assistants, automated testing tools, and code optimization solutions. Built by developers, for developers.',
    color: 'from-violet-500 to-indigo-600',
    bgColor: 'from-violet-500/10 to-indigo-600/10',
    features: [
      'Code Analysis',
      'Automated Testing',
      'Performance Optimization',
      'Documentation Generation',
    ],
    stats: { projects: 14, users: '4.2K+', satisfaction: '99%' },
  },
  design: {
    name: 'Design',
    icon: '🎨',
    description: 'Creative design and visual content tools',
    longDescription:
      'Create stunning visuals, generate design systems, and optimize user experiences with our AI-powered design tools. Perfect for designers, marketers, and creative professionals.',
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'from-amber-500/10 to-yellow-600/10',
    features: ['Design Generation', 'Color Palettes', 'Layout Optimization', 'Brand Guidelines'],
    stats: { projects: 9, users: '1.9K+', satisfaction: '95%' },
  },
}

// Mock projects filtered by category
const getCategoryProjects = (categorySlug: string) => {
  // This would normally come from a database
  const allProjects = [
    {
      id: '1',
      title: 'AI Writing Assistant Pro',
      description:
        'Advanced GPT-powered writing assistant with industry-specific knowledge, tone adjustment, and collaborative editing features.',
      category: 'ai-tools',
      slug: 'ai-writing-assistant-pro',
      embedUrl: 'https://chat.openai.com/g/example',
      badge: 'featured' as const,
      createdAt: '2024-01-15',
      popularity: 95,
    },
    {
      id: '6',
      title: 'Customer Support Chatbot',
      description:
        'Advanced AI chatbot for customer support with natural language understanding and knowledge base integration.',
      category: 'ai-tools',
      slug: 'customer-support-chatbot',
      embedUrl: 'https://chat.openai.com/g/example-6',
      createdAt: '2024-01-08',
      popularity: 82,
    },
    {
      id: '2',
      title: 'Smart Data Analyzer',
      description:
        'Automated data analysis and visualization tool with real-time insights, predictive analytics, and custom reporting.',
      category: 'analytics',
      slug: 'smart-data-analyzer',
      embedUrl: 'https://chat.openai.com/g/example-2',
      badge: 'featured' as const,
      createdAt: '2024-01-20',
      popularity: 88,
    },
    {
      id: '7',
      title: 'Financial Forecast Model',
      description:
        'Sophisticated financial modeling tool with predictive analytics, risk assessment, and scenario planning.',
      category: 'analytics',
      slug: 'financial-forecast-model',
      embedUrl: 'https://chat.openai.com/g/example-7',
      badge: 'new' as const,
      createdAt: '2024-01-22',
      popularity: 90,
    },
  ]

  return allProjects.filter((project) => project.category === categorySlug)
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Alphabetical' },
]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const categoryData = CATEGORY_DATA[params.slug as keyof typeof CATEGORY_DATA]

  if (!categoryData) {
    notFound()
  }

  const projects = getCategoryProjects(params.slug)

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popular':
          return (b.popularity || 0) - (a.popularity || 0)
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen">
      {/* Category Hero Section */}
      <div className={`bg-gradient-to-br ${categoryData.bgColor} py-20`}>
        <div className="container">
          <AnimatedCard className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">{categoryData.icon}</div>
            <h1
              className={`heading-hero bg-gradient-to-r ${categoryData.color} bg-clip-text text-transparent mb-6`}
            >
              {categoryData.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {categoryData.longDescription}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{categoryData.stats.projects}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{categoryData.stats.users}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{categoryData.stats.satisfaction}</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <Button
              size="lg"
              className={`bg-gradient-to-r ${categoryData.color} text-white hover:opacity-90`}
            >
              Explore {categoryData.name}
            </Button>
          </AnimatedCard>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16">
        <AnimatedCard delay={200} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our {categoryData.name.toLowerCase()} exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.features.map((feature, index) => (
              <FeatureCard
                key={feature}
                icon="✨"
                title={feature}
                description={`Advanced ${feature.toLowerCase()} capabilities`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </AnimatedCard>

        {/* Projects Section */}
        <AnimatedCard delay={400}>
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            <div>
              <h2 className="heading-section mb-2">{categoryData.name} Projects</h2>
              <p className="text-muted-foreground">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}{' '}
                available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder={`Search ${categoryData.name.toLowerCase()}...`}
                className="w-full sm:w-80"
              />
              <SortFilter
                sortBy={sortBy}
                onSortChange={setSortBy}
                options={SORT_OPTIONS}
                className="w-full sm:w-auto min-w-[160px]"
              />
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  category={categoryData.name}
                  badge={project.badge}
                  href={`/projects/${project.slug}`}
                  embedUrl={project.embedUrl}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` } as React.CSSProperties}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search query or check back later for new projects.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          )}
        </AnimatedCard>

        {/* CTA Section */}
        <AnimatedCard delay={600} className="mt-16">
          <div
            className={`text-center bg-gradient-to-br ${categoryData.bgColor} rounded-2xl p-12 border border-primary/10`}
          >
            <div className="text-4xl mb-4">{categoryData.icon}</div>
            <h3 className="heading-section mb-4">Need Custom {categoryData.name}?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Looking for a specialized solution? Let's build a custom{' '}
              {categoryData.name.toLowerCase()}
              tool tailored to your specific requirements and workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={`bg-gradient-to-r ${categoryData.color} text-white hover:opacity-90`}
              >
                Request Custom Solution
              </Button>
              <Button variant="outline" size="lg">
                View All Categories
              </Button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
