import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { UserProvider } from '@/lib/user-context'
import { Header } from '@/components/header'
import { FloatingChatbot } from '@/components/floating-chatbot'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'jansetu - Government Scheme Accessibility Platform',
  description: 'Find government schemes you can actually use. AI-powered eligibility matching in your language.',
  generator: 'v0.app',
  keywords: ['government schemes', 'scholarships', 'India', 'eligibility', 'benefits'],
  icons: {
    icon: [
      {
        url: '/jansetu.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/jansetu.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/jansetu.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <UserProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">
              {children}
            </main>
            <FloatingChatbot />
          </UserProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
