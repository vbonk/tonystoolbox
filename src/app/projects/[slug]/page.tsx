import { AnimatedCard } from '@/components/ui/animated-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GPTEmbedPreview } from '@/components/ui/robot-assistant'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Enhanced mock data - will be replaced with database queries
const MOCK_PROJECTS = {
  'ai-writing-assistant-pro': {
    id: '1',
    title: 'AI Writing Assistant Pro',
    description:
      'Advanced GPT-powered writing assistant with industry-specific knowledge and collaborative features',
    longDescription: `Transform your writing process with our most advanced AI writing assistant. This powerful tool combines cutting-edge language models with deep industry knowledge to deliver exceptional writing support across all professional contexts.

Whether you're crafting technical documentation, marketing materials, academic papers, or creative content, this assistant adapts to your specific needs and maintains consistent quality throughout your work.`,
    category: 'AI Tools',
    categorySlug: 'ai-tools',
    embedUrl: 'https://chat.openai.com/g/example',
    features: [
      'Industry-specific knowledge base with 500+ domains',
      'Advanced grammar and style optimization',
      'Intelligent tone and voice adjustment',
      'Custom template generation and management',
      'Real-time collaborative editing support',
      'Multi-language content creation',
      'SEO optimization suggestions',
      'Plagiarism detection and originality scoring',
    ],
    technologies: ['GPT-4', 'Natural Language Processing', 'Machine Learning', 'API Integration'],
    badges: ['featured', 'popular'],
    stats: {
      users: '2.5K+',
      rating: 4.9,
      uptime: '99.9%',
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-22',
  },
  'smart-data-analyzer': {
    id: '2',
    title: 'Smart Data Analyzer',
    description:
      'Intelligent data analysis platform with real-time insights and predictive analytics',
    longDescription: `Unlock the power of your data with our comprehensive analysis platform. Built for data scientists, business analysts, and decision-makers who need to transform complex datasets into clear, actionable insights.

Our advanced algorithms automatically detect patterns, identify trends, and generate predictive models that help you make informed decisions faster than ever before.`,
    category: 'Analytics',
    categorySlug: 'analytics',
    embedUrl: 'https://chat.openai.com/g/example-2',
    features: [
      'Automated data cleaning and preprocessing',
      'Advanced statistical analysis engine',
      'Interactive visualization dashboards',
      'Predictive modeling and forecasting',
      'Real-time data streaming support',
      'Custom report generation',
      'API-first architecture for integrations',
      'Enterprise-grade security and compliance',
    ],
    technologies: ['Python', 'TensorFlow', 'Apache Spark', 'D3.js', 'PostgreSQL'],
    badges: ['featured', 'new'],
    stats: {
      users: '1.8K+',
      rating: 4.8,
      uptime: '99.7%',
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20',
  },
  'workflow-automation-engine': {
    id: '3',
    title: 'Workflow Automation Engine',
    description:
      'Complete automation system for streamlining business processes and eliminating repetitive tasks',
    longDescription: `Revolutionize your business operations with our intelligent automation platform. Designed to eliminate bottlenecks, reduce manual errors, and free up your team to focus on high-value activities.

Our no-code/low-code approach means anyone can create powerful automations without technical expertise, while still providing the flexibility that developers need for complex scenarios.`,
    category: 'Automation',
    categorySlug: 'automation',
    embedUrl: 'https://chat.openai.com/g/example-3',
    features: [
      'Visual workflow builder with drag-and-drop interface',
      'Pre-built automation templates for common scenarios',
      'Advanced conditional logic and branching',
      'Integration with 500+ popular business applications',
      'Real-time monitoring and performance analytics',
      'Error handling and automatic retry mechanisms',
      'Role-based access control and approval workflows',
      'Scalable cloud infrastructure with auto-scaling',
    ],
    technologies: ['Node.js', 'React', 'Docker', 'Kubernetes', 'Redis'],
    badges: ['new', 'trending'],
    stats: {
      users: '1.2K+',
      rating: 4.9,
      uptime: '99.8%',
    },
    createdAt: '2024-01-25',
    updatedAt: '2024-01-26',
  },
}

type ProjectParams = {
  slug: string
}

export default function ProjectDetailPage({ params }: { params: ProjectParams }) {
  const project = MOCK_PROJECTS[params.slug as keyof typeof MOCK_PROJECTS]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg py-16">
        <div className="container">
          <AnimatedCard className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary">{project.category}</Badge>
              {project.badges?.map((badge) => (
                <Badge
                  key={badge}
                  variant={
                    badge === 'featured' ? 'featured' : badge === 'new' ? 'success' : 'premium'
                  }
                  className="capitalize"
                >
                  {badge}
                </Badge>
              ))}
              <Badge variant="outline">
                Updated {new Date(project.updatedAt).toLocaleDateString()}
              </Badge>
            </div>

            <h1 className="heading-hero gradient-text mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold">{project.stats.users}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">⭐ {project.stats.rating}</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{project.stats.uptime}</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <AnimatedCard delay={200}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>📋</span>
                    About This Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-muted-foreground leading-relaxed">
                    {project.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Features Section */}
            <AnimatedCard delay={300}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>✨</span>
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-violet-500/5 border border-primary/10"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Technology Stack */}
            <AnimatedCard delay={400}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🔧</span>
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-muted hover:bg-muted/80">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* GPT Embed Preview */}
            <AnimatedCard delay={500}>
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🚀</span>
                    Try It Now
                  </CardTitle>
                  <CardDescription>Interactive demo of this AI tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <GPTEmbedPreview title={project.title} className="mb-4" />
                  <Button asChild className="w-full btn-gradient">
                    <a href={project.embedUrl} target="_blank" rel="noopener noreferrer">
                      Launch Full Version
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Project Info */}
            <AnimatedCard delay={600}>
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>ℹ️</span>
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Category</span>
                    <Link
                      href={`/projects/category/${project.categorySlug}`}
                      className="text-primary hover:underline"
                    >
                      {project.category}
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Created</span>
                    <span className="text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Updated</span>
                    <span className="text-muted-foreground">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Version</span>
                    <Badge variant="success" size="sm">
                      v2.1.0
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            {/* Actions */}
            <AnimatedCard delay={700}>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/projects">← Back to Projects</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/projects/category/${project.categorySlug}`}>
                    More {project.category}
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact">Request Custom Tool</Link>
                </Button>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Related Projects CTA */}
        <AnimatedCard delay={800} className="mt-16">
          <div className="text-center bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 rounded-2xl p-12 border border-primary/10">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="heading-section mb-4">Explore More {project.category}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover other powerful tools in the {project.category.toLowerCase()} category and
              find the perfect solution for your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient">
                <Link href={`/projects/category/${project.categorySlug}`}>
                  Browse {project.category}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">All Projects</Link>
              </Button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
