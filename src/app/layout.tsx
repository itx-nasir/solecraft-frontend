import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoleCraft - Custom Shoe Design Platform',
  description: 'Design and customize your perfect shoes with SoleCraft. Premium materials, expert craftsmanship, and personalized style.',
  keywords: 'custom shoes, shoe design, personalized footwear, sneakers, boots, handmade shoes',
  authors: [{ name: 'SoleCraft Team' }],
  creator: 'SoleCraft',
  publisher: 'SoleCraft',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solecraft.com',
    siteName: 'SoleCraft',
    title: 'SoleCraft - Custom Shoe Design Platform',
    description: 'Design and customize your perfect shoes with SoleCraft. Premium materials, expert craftsmanship, and personalized style.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SoleCraft Custom Shoes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoleCraft - Custom Shoe Design Platform',
    description: 'Design and customize your perfect shoes with SoleCraft.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 