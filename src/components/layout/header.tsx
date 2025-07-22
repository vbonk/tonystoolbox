'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogoLink } from '@/components/ui/logo'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <LogoLink href={ROUTES.HOME} className="mr-8" showText />

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              href={ROUTES.TOOLS}
              className="transition-all duration-300 hover:text-primary hover:scale-105 text-muted-foreground hover:text-foreground relative group"
            >
              Tools
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href={ROUTES.PROJECTS}
              className="transition-all duration-300 hover:text-primary hover:scale-105 text-muted-foreground hover:text-foreground relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="transition-all duration-300 hover:text-primary hover:scale-105 text-muted-foreground hover:text-foreground relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1.5">
              <span
                className={cn(
                  'block h-0.5 w-5 bg-foreground transition-all duration-300',
                  isMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-foreground transition-all duration-300',
                  isMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-foreground transition-all duration-300',
                  isMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3">
          <nav className="hidden sm:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="glass-button">
              <span className="mr-2">👤</span>
              Sign In
            </Button>
            <Button
              size="sm"
              className="btn-gradient shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              <span className="mr-2">✨</span>
              Get Started
            </Button>
          </nav>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <div className="status-dot status-online animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container py-4 space-y-3">
            <Link
              href={ROUTES.TOOLS}
              className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent/50"
              onClick={() => setIsMenuOpen(false)}
            >
              🛠️ Tools
            </Link>
            <Link
              href={ROUTES.PROJECTS}
              className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent/50"
              onClick={() => setIsMenuOpen(false)}
            >
              🚀 Projects
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent/50"
              onClick={() => setIsMenuOpen(false)}
            >
              ℹ️ About
            </Link>
            <div className="pt-3 border-t space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="mr-2">👤</span>
                Sign In
              </Button>
              <Button size="sm" className="w-full btn-gradient">
                <span className="mr-2">✨</span>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
