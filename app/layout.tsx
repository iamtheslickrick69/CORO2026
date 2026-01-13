import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap", // Prevents FOUT - shows fallback immediately, swaps when loaded
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Coro - Anonymous Employee Feedback Platform',
  description: 'Coro helps organizations collect real, anonymous feedback from employees via SMS. AI-powered insights surface trends and risks before they become crises.',
  metadataBase: new URL('https://coro.com'),
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
  openGraph: {
    title: 'Coro - Anonymous Employee Feedback Platform',
    description: 'Real feedback from your team, delivered via SMS. Coro surfaces trends and risks before they become crises.',
    url: 'https://coro.com',
    siteName: 'Coro',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coro - Anonymous Employee Feedback Platform',
    description: 'Real feedback from your team, delivered via SMS. Coro surfaces trends and risks before they become crises.',
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
