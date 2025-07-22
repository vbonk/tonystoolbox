'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  glow?: boolean
  interactive?: boolean
  delay?: number
}

export function AnimatedCard({
  className,
  children,
  hover = true,
  glow = false,
  interactive = false,
  delay = 0,
  ...props
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        hover && 'hover:-translate-y-2 hover:shadow-xl',
        glow && 'card-glow',
        interactive && 'cursor-pointer hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  href?: string
  className?: string
  style?: React.CSSProperties
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  href,
  className,
  style,
}: FeatureCardProps) {
  const CardWrapper = href ? 'a' : 'div'

  return (
    <AnimatedCard interactive={!!href} glow className={className} style={style}>
      <CardWrapper {...(href && { href, className: 'block' })}>
        <Card className="card-feature h-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 text-3xl">
              {icon}
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              {title}
              {badge && (
                <span className="badge-featured text-xs px-2 py-1 rounded-full">{badge}</span>
              )}
            </CardTitle>
            <CardDescription className="text-center">{description}</CardDescription>
          </CardHeader>
        </Card>
      </CardWrapper>
    </AnimatedCard>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  category: string
  image?: string
  badge?: 'featured' | 'new' | 'premium'
  href?: string
  embedUrl?: string
  className?: string
  style?: React.CSSProperties
}

export function ProjectCard({
  title,
  description,
  category,
  image,
  badge,
  href,
  embedUrl,
  className,
  style,
}: ProjectCardProps) {
  return (
    <AnimatedCard interactive glow className={className} style={style}>
      <Card className="card-project h-full">
        <div className="aspect-video bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm text-muted-foreground">Project Preview</div>
            </div>
          )}
          {badge && (
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  'badge-featured text-xs px-2 py-1 rounded-full font-medium',
                  badge === 'featured' && 'badge-featured',
                  badge === 'new' && 'badge-success',
                  badge === 'premium' && 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                )}
              >
                {badge}
              </span>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="badge-secondary text-xs">{category}</span>
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex gap-2">
            {href && (
              <a
                href={href}
                className="btn-secondary flex-1 text-center text-sm py-2 px-4 inline-block"
              >
                View Details
              </a>
            )}
            {embedUrl && (
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-center text-sm py-2 px-4 inline-block"
              >
                Try Now
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}
