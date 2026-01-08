import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CORO - Anonymous Employee Feedback Platform',
  description: 'CORO helps organizations collect real, anonymous feedback from employees via SMS. AI-powered insights surface trends and risks before they become crises.',
  metadataBase: new URL('https://coro.com'),
  icons: {
    icon: [
      {
        url: '/logo-standard.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo-black.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/logo-standard.png',
    shortcut: '/logo-standard.png',
  },
  openGraph: {
    title: 'CORO - Anonymous Employee Feedback Platform',
    description: 'Real feedback from your team, delivered via SMS. CORO surfaces trends and risks before they become crises.',
    url: 'https://coro.com',
    siteName: 'CORO',
    images: [
      {
        url: '/logo-standard.png',
        width: 1200,
        height: 630,
        alt: 'CORO - Anonymous Employee Feedback Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CORO - Anonymous Employee Feedback Platform',
    description: 'Real feedback from your team, delivered via SMS. CORO surfaces trends and risks before they become crises.',
    images: ['/logo-standard.png'],
    creator: '@coro',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
