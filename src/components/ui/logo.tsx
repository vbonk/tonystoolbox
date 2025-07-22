import * as React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'dark'
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
}

export function Logo({ className, showText = true, size = 'md', variant = 'default' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Robot Icon - inspired by the logo */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl transition-all duration-300',
          sizeClasses[size],
          variant === 'default' &&
            'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25',
          variant === 'white' && 'bg-white shadow-lg',
          variant === 'dark' && 'bg-slate-800 shadow-lg'
        )}
      >
        <div
          className={cn(
            'relative',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-base',
            size === 'lg' && 'text-lg',
            size === 'xl' && 'text-xl'
          )}
        >
          🤖
        </div>

        {/* Gear overlay - representing the toolbox */}
        <div
          className={cn(
            'absolute -bottom-1 -right-1 flex items-center justify-center rounded-full',
            variant === 'default' && 'bg-orange-400 text-white shadow-sm',
            variant === 'white' && 'bg-orange-400 text-white shadow-sm',
            variant === 'dark' && 'bg-orange-400 text-white shadow-sm',
            size === 'sm' && 'w-3 h-3 text-xs',
            size === 'md' && 'w-4 h-4 text-xs',
            size === 'lg' && 'w-5 h-5 text-sm',
            size === 'xl' && 'w-6 h-6 text-base'
          )}
        >
          ⚙️
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-bold leading-none',
              textSizeClasses[size],
              variant === 'default' && 'gradient-text',
              variant === 'white' && 'text-white',
              variant === 'dark' && 'text-slate-900'
            )}
          >
            Tony's
          </span>
          <span
            className={cn(
              'font-bold leading-none -mt-1',
              textSizeClasses[size],
              variant === 'default' && 'text-slate-700 dark:text-slate-300',
              variant === 'white' && 'text-white/90',
              variant === 'dark' && 'text-slate-600'
            )}
          >
            ToolBox
          </span>
        </div>
      )}
    </div>
  )
}

interface LogoLinkProps extends LogoProps {
  href?: string
}

export function LogoLink({ href = '/', ...props }: LogoLinkProps) {
  return (
    <Link href={href} className="transition-opacity hover:opacity-90">
      <Logo {...props} />
    </Link>
  )
}
