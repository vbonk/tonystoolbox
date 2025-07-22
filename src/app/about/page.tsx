import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-6">About Tony's Toolbox</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your premier destination for AI tools, automation solutions, and productivity resources
          </p>
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6"></div>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              At Tony's Toolbox, we're dedicated to democratizing access to cutting-edge AI tools
              and automation solutions. Our platform showcases handpicked tools, custom AI
              assistants, and automation workflows that help individuals and businesses maximize
              their productivity and unlock new possibilities in the digital age.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🤖</span>
                AI-Powered Solutions
              </CardTitle>
              <CardDescription>
                Custom GPT assistants and AI tools tailored for specific use cases
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚡</span>
                Automation Workflows
              </CardTitle>
              <CardDescription>
                Streamlined processes that save time and eliminate repetitive tasks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                Analytics & Insights
              </CardTitle>
              <CardDescription>
                Data-driven tools for better decision making and performance tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎯</span>
                Curated Selection
              </CardTitle>
              <CardDescription>
                Carefully vetted tools and resources for maximum impact and reliability
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Built with Modern Technology</CardTitle>
            <CardDescription>
              Tony's Toolbox is built using cutting-edge web technologies for optimal performance
              and user experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">Next.js 14</div>
                <div className="text-muted-foreground">React Framework</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">Supabase</div>
                <div className="text-muted-foreground">Database & Auth</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">TailwindCSS</div>
                <div className="text-muted-foreground">Styling</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">TypeScript</div>
                <div className="text-muted-foreground">Type Safety</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our collection of AI tools and automation solutions today
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <a href="/tools">Browse Tools</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/projects">View Projects</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
