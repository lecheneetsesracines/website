import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Le Chêne et ces racines',
    default: 'Le Chêne et ces racines',
  },
  description:
    'Association dédiée au soutien des familles, nous offrons un cadre bienveillant et sécurisé pour accompagner les parents et les enfants dans la reconstruction de leurs liens. Notre équipe pluridisciplinaire est à l’écoute de chacun, avec pour objectif de favoriser l’apaisement, la confiance et l’autonomie dans le respect de chaque histoire.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-green-800 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
