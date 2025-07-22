'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface RobotAssistantProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  mood?: 'happy' | 'working' | 'thinking' | 'excited'
  showMessage?: string
  animated?: boolean
}

const sizeClasses = {
  sm: 'w-12 h-12 text-2xl',
  md: 'w-20 h-20 text-4xl',
  lg: 'w-32 h-32 text-6xl',
}

const moodEmojis = {
  happy: '🤖',
  working: '🔧',
  thinking: '🤔',
  excited: '🚀',
}

export function RobotAssistant({
  className,
  size = 'md',
  mood = 'happy',
  showMessage,
  animated = true,
}: RobotAssistantProps) {
  const [currentMood, setCurrentMood] = React.useState(mood)

  React.useEffect(() => {
    if (!animated) return

    const moods: Array<typeof mood> = ['happy', 'working', 'thinking', 'excited']
    const interval = setInterval(() => {
      setCurrentMood(moods[Math.floor(Math.random() * moods.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [animated])

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl transition-all duration-500',
          sizeClasses[size],
          animated && 'hover:scale-110 hover:rotate-3'
        )}
      >
        <span className="transition-all duration-500">
          {moodEmojis[animated ? currentMood : mood]}
        </span>

        {/* Animated gears */}
        <div
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-orange-400 text-white shadow-lg transition-all duration-500',
            size === 'sm' && 'w-4 h-4 text-xs',
            size === 'md' && 'w-6 h-6 text-sm',
            size === 'lg' && 'w-10 h-10 text-xl',
            animated && 'animate-spin-slow'
          )}
        >
          ⚙️
        </div>

        {/* Status indicators */}
        <div className="absolute -bottom-1 -left-1">
          <div className={cn('status-dot status-online', animated && 'animate-pulse')}></div>
        </div>
      </div>

      {showMessage && (
        <div className="mt-4 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border max-w-xs">
          <p className="text-sm text-center">{showMessage}</p>
        </div>
      )}
    </div>
  )
}

interface ChatBubbleProps {
  message: string
  isUser?: boolean
  className?: string
}

export function ChatBubble({ message, isUser = false, className }: ChatBubbleProps) {
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start', className)}>
      <div
        className={cn(
          'max-w-xs px-4 py-2 rounded-2xl shadow-sm',
          isUser ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}

export function GPTEmbedPreview({
  title = 'AI Assistant',
  className,
}: {
  title?: string
  className?: string
}) {
  const [messages, setMessages] = React.useState([
    { text: "Hi! I'm your AI assistant. How can I help you today?", isUser: false },
  ])

  const [inputValue, setInputValue] = React.useState('')

  const handleSend = () => {
    if (!inputValue.trim()) return

    setMessages((prev) => [
      ...prev,
      { text: inputValue, isUser: true },
      { text: "That's a great question! I'd love to help you with that.", isUser: false },
    ])
    setInputValue('')
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/50 dark:to-slate-950/50 rounded-xl border border-blue-200/50 dark:border-blue-800/50 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white/50 dark:bg-slate-900/50">
        <RobotAssistant size="sm" animated={false} />
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">AI-powered assistance</p>
        </div>
        <div className="ml-auto">
          <div className="status-dot status-online animate-pulse"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-48 p-4 space-y-3 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message.text} isUser={message.isUser} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white/50 dark:bg-slate-900/50">
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
