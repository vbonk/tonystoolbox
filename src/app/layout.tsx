import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Tony's Toolbox | AI & Automation Hub",
    template: "%s | Tony's Toolbox",
  },
  description:
    'Transform your workflow with cutting-edge AI tools, intelligent automation, and custom solutions designed for the modern professional.',
  keywords: [
    'AI tools',
    'automation',
    'productivity',
    'GPT assistants',
    'machine learning',
    'artificial intelligence',
    'workflow optimization',
    'custom AI solutions',
    'business automation',
    "Tony's Toolbox",
  ],
  authors: [{ name: 'Tony', url: 'https://tonystoolbox.com' }],
  creator: "Tony's Toolbox",
  publisher: "Tony's Toolbox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tonystoolbox.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tonystoolbox.vercel.app',
    title: "Tony's Toolbox | AI & Automation Hub",
    description:
      'Transform your workflow with cutting-edge AI tools, intelligent automation, and custom solutions designed for the modern professional.',
    siteName: "Tony's Toolbox",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Tony's Toolbox - AI & Automation Hub",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tony's Toolbox | AI & Automation Hub",
    description:
      'Transform your workflow with cutting-edge AI tools, intelligent automation, and custom solutions.',
    creator: '@tonystoolbox',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, 'min-h-screen bg-background font-sans antialiased')}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
