import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock data - will be replaced with database queries
const MOCK_TOOLS = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced AI assistant for conversations, writing, and problem-solving',
    category: 'AI Tools',
    url: 'https://chat.openai.com',
    image: '/api/placeholder/300/200',
    featured: true,
  },
  {
    id: '2',
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    category: 'Productivity',
    url: 'https://notion.so',
    image: '/api/placeholder/300/200',
    featured: true,
  },
  {
    id: '3',
    name: 'Zapier',
    description: 'Automation platform connecting your favorite apps and services',
    category: 'Automation',
    url: 'https://zapier.com',
    image: '/api/placeholder/300/200',
    featured: false,
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">AI Tools Directory</h1>
        <p className="text-xl text-muted-foreground">
          Discover the best AI tools and automation solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TOOLS.map((tool) => (
          <Card key={tool.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="w-full h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Tool Preview</span>
              </div>
              <CardTitle className="flex items-center justify-between">
                <span>{tool.name}</span>
                {tool.featured && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="mb-4">
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {tool.category}
                </span>
              </div>
              <Button asChild className="w-full">
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  Launch Tool
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
