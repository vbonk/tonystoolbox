'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from './badge'

interface CategoryFilterProps {
  categories: Array<{
    id: string
    name: string
    count?: number
    icon?: string
  }>
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5',
          selectedCategory === 'all'
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
            : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
        )}
      >
        <span>🌟</span>
        All Categories
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5',
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
          )}
        >
          {category.icon && <span>{category.icon}</span>}
          {category.name}
          {category.count && (
            <Badge variant="secondary" size="sm" className="ml-1">
              {category.count}
            </Badge>
          )}
        </button>
      ))}
    </div>
  )
}

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  placeholder = 'Search projects...',
  className,
}: SearchFilterProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-input bg-background rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300"
      />
    </div>
  )
}

interface SortFilterProps {
  sortBy: string
  onSortChange: (sortBy: string) => void
  options: Array<{
    value: string
    label: string
  }>
  className?: string
}

export function SortFilter({ sortBy, onSortChange, options, className }: SortFilterProps) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className={cn(
        'px-4 py-3 border border-input bg-background rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300',
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
