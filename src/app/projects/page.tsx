'use client'

import React, { useState, useMemo } from 'react'
import { AnimatedCard, ProjectCard } from '@/components/ui/animated-card'
import { CategoryFilter, SearchFilter, SortFilter } from '@/components/ui/category-filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Enhanced mock data with more projects and categories
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'AI Writing Assistant Pro',
    description:
      'Advanced GPT-powered writing assistant with industry-specific knowledge, tone adjustment, and collaborative editing features.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    slug: 'ai-writing-assistant-pro',
    embedUrl: 'https://chat.openai.com/g/example',
    badge: 'featured' as const,
    createdAt: '2024-01-15',
    popularity: 95,
  },
  {
    id: '2',
    title: 'Smart Data Analyzer',
    description:
      'Automated data analysis and visualization tool with real-time insights, predictive analytics, and custom reporting.',
    category: 'analytics',
    categoryName: 'Analytics',
    slug: 'smart-data-analyzer',
    embedUrl: 'https://chat.openai.com/g/example-2',
    badge: 'featured' as const,
    createdAt: '2024-01-20',
    popularity: 88,
  },
  {
    id: '3',
    title: 'Workflow Automation Engine',
    description:
      'Complete workflow automation system that eliminates repetitive tasks and streamlines business processes.',
    category: 'automation',
    categoryName: 'Automation',
    slug: 'workflow-automation-engine',
    embedUrl: 'https://chat.openai.com/g/example-3',
    badge: 'new' as const,
    createdAt: '2024-01-25',
    popularity: 92,
  },
  {
    id: '4',
    title: 'Marketing Content Generator',
    description:
      'AI-powered marketing assistant that creates compelling copy, social media posts, and campaign strategies.',
    category: 'marketing',
    categoryName: 'Marketing',
    slug: 'marketing-content-generator',
    embedUrl: 'https://chat.openai.com/g/example-4',
    badge: 'premium' as const,
    createdAt: '2024-01-18',
    popularity: 85,
  },
  {
    id: '5',
    title: 'Code Review Assistant',
    description:
      'Intelligent code review tool that analyzes code quality, suggests improvements, and ensures best practices.',
    category: 'development',
    categoryName: 'Development',
    slug: 'code-review-assistant',
    embedUrl: 'https://chat.openai.com/g/example-5',
    createdAt: '2024-01-12',
    popularity: 78,
  },
  {
    id: '6',
    title: 'Customer Support Chatbot',
    description:
      'Advanced AI chatbot for customer support with natural language understanding and knowledge base integration.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    slug: 'customer-support-chatbot',
    embedUrl: 'https://chat.openai.com/g/example-6',
    createdAt: '2024-01-08',
    popularity: 82,
  },
  {
    id: '7',
    title: 'Financial Forecast Model',
    description:
      'Sophisticated financial modeling tool with predictive analytics, risk assessment, and scenario planning.',
    category: 'analytics',
    categoryName: 'Analytics',
    slug: 'financial-forecast-model',
    embedUrl: 'https://chat.openai.com/g/example-7',
    badge: 'new' as const,
    createdAt: '2024-01-22',
    popularity: 90,
  },
  {
    id: '8',
    title: 'Design System Generator',
    description:
      'Automated design system creation tool that generates consistent UI components and style guides.',
    category: 'design',
    categoryName: 'Design',
    slug: 'design-system-generator',
    embedUrl: 'https://chat.openai.com/g/example-8',
    createdAt: '2024-01-14',
    popularity: 75,
  },
]

const CATEGORIES = [
  { id: 'ai-tools', name: 'AI Tools', icon: '🤖', count: 2 },
  { id: 'analytics', name: 'Analytics', icon: '📊', count: 2 },
  { id: 'automation', name: 'Automation', icon: '⚡', count: 1 },
  { id: 'marketing', name: 'Marketing', icon: '📈', count: 1 },
  { id: 'development', name: 'Development', icon: '💻', count: 1 },
  { id: 'design', name: 'Design', icon: '🎨', count: 1 },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Alphabetical' },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = MOCK_PROJECTS

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.categoryName.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg-hero py-16 sm:py-20">
        <div className="container">
          <AnimatedCard className="text-center max-w-4xl mx-auto">
            <h1 className="heading-hero gradient-text mb-6">AI Project Showcase</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover cutting-edge AI tools, automation solutions, and custom GPT assistants
              designed to transform your workflow and boost productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="featured" size="lg">
                🚀 {MOCK_PROJECTS.length} Projects Available
              </Badge>
              <Badge variant="success" size="lg">
                ✨ Updated Weekly
              </Badge>
              <Badge variant="premium" size="lg">
                🎯 Production Ready
              </Badge>
            </div>
          </AnimatedCard>
        </div>
      </div>

      <div className="container py-12">
        {/* Filters Section */}
        <AnimatedCard delay={200} className="mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 min-w-0">
                  <SearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    placeholder="Search AI tools, automation, analytics..."
                    className="w-full max-w-md"
                  />
                </div>
                <SortFilter
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  options={SORT_OPTIONS}
                  className="w-full lg:w-auto min-w-[180px]"
                />
              </div>

              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </AnimatedCard>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedCategory === 'all'
                  ? 'All Projects'
                  : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredAndSortedProjects.length} project
                {filteredAndSortedProjects.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            {filteredAndSortedProjects.length > 0 && (
              <Button variant="outline" className="hidden sm:flex">
                View All Categories
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                category={project.categoryName}
                badge={project.badge}
                href={`/projects/${project.slug}`}
                embedUrl={project.embedUrl}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <AnimatedCard delay={400} className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all categories.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
                <Button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                >
                  View All Projects
                </Button>
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Call to Action */}
        <AnimatedCard delay={600} className="mt-16">
          <div className="text-center bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 rounded-2xl p-12 border border-primary/10">
            <h3 className="heading-section mb-4">Need a Custom Solution?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Let's build a custom AI tool or automation
              solution tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-gradient">
                Request Custom Project
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
