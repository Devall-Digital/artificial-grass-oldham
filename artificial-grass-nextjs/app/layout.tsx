import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/Toaster'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Artificial Grass Oldham | Premium Artificial Lawn Installation',
    template: '%s | Artificial Grass Oldham'
  },
  description: 'Transform your Oldham garden with premium artificial grass installation. Serving Saddleworth, Uppermill, Delph & surrounding areas. Free quotes, expert installation, 10-year guarantee.',
  keywords: 'artificial grass Oldham, fake grass Oldham, artificial lawn Oldham, artificial grass Saddleworth, artificial grass Uppermill, artificial grass installation Oldham',
  authors: [{ name: 'Artificial Grass Oldham' }],
  creator: 'Artificial Grass Oldham',
  publisher: 'Artificial Grass Oldham',
  metadataBase: new URL('https://artificialgrassoldham.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://artificialgrassoldham.co.uk',
    siteName: 'Artificial Grass Oldham',
    title: 'Artificial Grass Oldham - Premium Installation Services',
    description: 'Transform your garden with our premium artificial grass installation in Oldham and surrounding areas. Free quotes available.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artificial Grass Oldham - Premium Lawn Installation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artificial Grass Oldham - Premium Installation Services',
    description: 'Transform your garden with our premium artificial grass installation in Oldham and surrounding areas.',
    images: ['/images/og-image.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white">
        <GoogleAnalytics />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}