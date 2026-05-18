import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { Grain } from '@/components/ui/grain'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://2pttech.com'),
  title: '2PT | The embedded AI engineering firm for marketing',
  description: 'Two Point Technologies deploys production AI inside enterprise marketing organisations through forward-deployed pods of AI engineers, marketing strategists and data engineers.',
  keywords: [
    'AI deployment',
    'enterprise AI for marketing',
    'forward-deployed engineering',
    'marketing AI consultancy',
    'retail media optimisation',
    'agentic AI for marketing',
    'generative engine optimisation',
    'AI-native marketing operations',
    'production AI systems',
  ],
  authors: [{ name: 'Two Point Technologies' }],
  creator: 'Two Point Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://2pttech.com',
    siteName: '2PT',
    title: '2PT | The embedded AI engineering firm for marketing',
    description: 'We deploy AI inside marketing teams. Not pilots. Production. Forward-deployed pods embedded inside enterprise marketing organisations.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2PT | The embedded AI engineering firm for marketing',
    description: 'We deploy AI inside marketing teams. Not pilots. Production.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#F5F5F5' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Two Point Technologies',
  alternateName: '2PT',
  url: 'https://2pttech.com',
  logo: 'https://2pttech.com/logo.png',
  description:
    'Two Point Technologies is the embedded AI engineering firm for marketing, advertising and communications. We deploy production AI inside enterprise marketing organisations through forward-deployed pods of AI engineers, marketing strategists and data engineers.',
  foundingDate: '2017',
  founder: {
    '@type': 'Person',
    name: 'Sam Gormley',
    jobTitle: 'CEO and Founder',
  },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '447 Broadway',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10013',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '45 Fitzroy Street',
      addressLocality: 'London',
      postalCode: 'W1D 3BW',
      addressCountry: 'GB',
    },
  ],
  sameAs: ['https://www.linkedin.com/company/two-point-technologies'],
  knowsAbout: [
    'AI deployment',
    'Marketing AI',
    'Retail media optimisation',
    'Agentic AI',
    'Forward-deployed engineering',
    'Enterprise AI consulting',
    'Generative engine optimisation',
    'AI-native marketing operations',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-[var(--2pt-offwhite)] text-[var(--2pt-black)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CursorGlow />
        <Grain />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
