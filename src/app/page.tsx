import { AnimatedCard, FeatureCard } from '@/components/ui/animated-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg-hero py-20 sm:py-32">
        <div className="container">
          <AnimatedCard className="text-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="featured" size="lg" className="animate-pulse">
                  ✨ New AI Tools Available
                </Badge>
                <h1 className="heading-display gradient-text text-balance">Tony's Toolbox</h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-balance">
                  Transform your workflow with cutting-edge AI tools, intelligent automation, and
                  custom solutions designed for the modern professional.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-gradient">
                  <Link href="/projects">Explore AI Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="glass-button">
                  <Link href="/tools">Browse Tools</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="status-dot status-online"></div>
                  All systems operational
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  ⚡ Response time &lt; 100ms
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  🔒 Enterprise security
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-20">
        <AnimatedCard delay={200} className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              🚀 Powered by Advanced AI
            </Badge>
            <h2 className="heading-section mb-6">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From AI-powered assistants to intelligent automation, discover tools that adapt to
              your workflow and amplify your capabilities.
            </p>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🤖"
            title="AI-Powered Tools"
            description="Custom GPT assistants and intelligent solutions that understand your specific needs and industry requirements."
            badge="Popular"
            href="/projects/category/ai-tools"
          />
          <FeatureCard
            icon="⚡"
            title="Smart Automation"
            description="Streamline workflows and eliminate repetitive tasks with intelligent automation that learns and adapts."
            href="/projects/category/automation"
          />
          <FeatureCard
            icon="📊"
            title="Advanced Analytics"
            description="Transform data into insights with powerful analytics tools and real-time dashboards."
            href="/projects/category/analytics"
          />
          <FeatureCard
            icon="💻"
            title="Developer Tools"
            description="Code smarter with AI-powered development tools, automated testing, and optimization solutions."
            href="/projects/category/development"
          />
          <FeatureCard
            icon="📈"
            title="Marketing Suite"
            description="AI-driven content creation, campaign optimization, and customer insight tools for marketers."
            badge="New"
            href="/projects/category/marketing"
          />
          <FeatureCard
            icon="🎨"
            title="Creative Studio"
            description="Design tools that spark creativity and streamline visual content creation processes."
            href="/projects/category/design"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 py-20">
        <div className="container">
          <AnimatedCard delay={400} className="text-center mb-12">
            <h2 className="heading-section mb-4">
              Trusted by <span className="gradient-text">Professionals</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their workflow with our AI-powered
              solutions.
            </p>
          </AnimatedCard>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCard delay={500} className="text-center">
              <div className="card-feature">
                <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                <div className="text-muted-foreground">AI Tools</div>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={600} className="text-center">
              <div className="card-feature">
                <div className="text-4xl font-bold gradient-text mb-2">25+</div>
                <div className="text-muted-foreground">Custom Projects</div>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={700} className="text-center">
              <div className="card-feature">
                <div className="text-4xl font-bold gradient-text mb-2">5K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={800} className="text-center">
              <div className="card-feature">
                <div className="text-4xl font-bold gradient-text mb-2">99%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-20">
        <AnimatedCard delay={600} className="text-center">
          <div className="max-w-4xl mx-auto">
            <div className="card-glow rounded-3xl p-12 bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 border border-primary/20">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="heading-section mb-6">
                Ready to <span className="gradient-text">Transform</span> Your Workflow?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start exploring our AI-powered tools today and discover how intelligent automation
                can revolutionize your productivity and creative process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-gradient">
                  <Link href="/projects">Start Exploring</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Badge variant="success">✅ Free to start</Badge>
                <Badge variant="secondary">🔄 No setup required</Badge>
                <Badge variant="outline">💡 Instant access</Badge>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  )
}
