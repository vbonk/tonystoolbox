import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Logo size="lg" showText className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              AI & Automation Hub for the modern creator. Discover cutting-edge tools, custom
              solutions, and intelligent workflows to transform your productivity.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" size="sm">
                ✅ 50+ AI Tools
              </Badge>
              <Badge variant="secondary" size="sm">
                🚀 Production Ready
              </Badge>
              <Badge variant="outline" size="sm">
                ⚡ Real-time Updates
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <nav className="space-y-3">
              <Link
                href={ROUTES.PROJECTS}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Projects
              </Link>
              <Link
                href={ROUTES.TOOLS}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Tool Directory
              </Link>
              <Link
                href="/projects/category/automation"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Automation
              </Link>
              <Link
                href="/projects/category/analytics"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <nav className="space-y-3">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Tony's Toolbox. Built with ❤️ for creators.
            </p>
            <div className="flex items-center gap-2">
              <div className="status-dot status-online"></div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                All systems operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Made with Next.js, Tailwind CSS, and AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
