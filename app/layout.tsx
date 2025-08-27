import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: 'Aniket Kumar - Cybersecurity Expert & Full Stack Developer',
    template: '%s | Aniket Kumar'
  },
  description: 'Personal portfolio and blog of Aniket Kumar - Cybersecurity Expert, Ethical Hacker, and Full Stack Developer. Explore my projects, skills, and insights in cybersecurity and web development.',
  keywords: ['Aniket Kumar', 'cybersecurity', 'ethical hacking', 'full stack developer', 'web development', 'security', 'portfolio', 'blog'],
  authors: [{ name: 'Aniket Kumar', url: 'https://anidz.app' }],
  creator: 'Aniket Kumar',
  publisher: 'Aniket Kumar',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anidz.app',
    siteName: 'Aniket Kumar',
    title: 'Aniket Kumar - Cybersecurity Expert & Full Stack Developer',
    description: 'Personal portfolio and blog of Aniket Kumar - Cybersecurity Expert, Ethical Hacker, and Full Stack Developer.',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'Aniket Kumar Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AniD_z',
    creator: '@AniD_z',
    title: 'Aniket Kumar - Cybersecurity Expert & Full Stack Developer',
    description: 'Personal portfolio and blog of Aniket Kumar - Cybersecurity Expert, Ethical Hacker, and Full Stack Developer.',
    images: ['/placeholder-logo.png'],
  },
  metadataBase: new URL('https://anidz.app'),
  alternates: {
    canonical: 'https://anidz.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}
        <Analytics />
      </body>
    </html>
  )
}
