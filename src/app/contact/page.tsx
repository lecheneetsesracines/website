import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ReactNode,
} from 'react'

import { Container } from '@/components/Container'
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { getPageContent } from '@/lib/pages'
import { ContactForm } from './ContactForm'

interface ContactLink {
  label?: string
  href?: string
}

interface ContactInfoBlock {
  heading?: string
  body?: string
}

interface ContactContent {
  title: string
  address?: ContactLink
  phone?: ContactLink
  email?: ContactLink
  infoBlocks: ContactInfoBlock[]
  mapEmbedUrl?: string
}

function parseContactContent(data: Record<string, unknown>): ContactContent {
  const toLink = (entry: unknown): ContactLink | undefined => {
    if (!entry || typeof entry !== 'object') {
      return undefined
    }

    const { label, href } = entry as { label?: unknown; href?: unknown }

    return {
      label: typeof label === 'string' ? label : undefined,
      href: typeof href === 'string' ? href : undefined,
    }
  }

  const infoBlocksRaw = Array.isArray(data.infoBlocks)
    ? (data.infoBlocks as unknown[])
    : []

  const infoBlocks: ContactInfoBlock[] = infoBlocksRaw
    .map((block) => {
      if (!block || typeof block !== 'object') {
        return null
      }

      const { heading, body } = block as { heading?: unknown; body?: unknown }

      return {
        heading: typeof heading === 'string' ? heading : undefined,
        body: typeof body === 'string' ? body : undefined,
      }
    })
    .filter(Boolean) as ContactInfoBlock[]

  if (infoBlocks.length === 0) {
    infoBlocks.push({
      heading: 'Informations de contact :',
    })
  }

  return {
    title:
      typeof data.title === 'string' && data.title.length > 0
        ? data.title
        : 'Contactez-nous',
    address: toLink(data.address),
    phone: toLink(data.phone),
    email: toLink(data.email),
    infoBlocks,
    mapEmbedUrl:
      typeof data.mapEmbedUrl === 'string' ? data.mapEmbedUrl : undefined,
  }
}

function Address({ address }: { address?: ContactLink }) {
  if (!address?.label) {
    return null
  }

  const lines = address.label.split(/\r?\n/)

  return (
    <dd>
      {address.href ? (
        <Link
          className="hover:text-amber-900 dark:hover:text-white"
          href={address.href}
        >
          {lines.map((line, index) => (
            <span key={line + index}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Link>
      ) : (
        lines.map((line, index) => (
          <span key={line + index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))
      )}
    </dd>
  )
}

function ContactLinkItem({
  icon: Icon,
  children,
}: {
  icon: ComponentType<ComponentPropsWithoutRef<'svg'>>
  children: ReactNode
}) {
  return (
    <div className="flex gap-x-4">
      <dt className="flex-none">
        <Icon
          aria-hidden="true"
          className="h-7 w-6 text-amber-400 dark:text-amber-400"
        />
      </dt>
      {children}
    </div>
  )
}

export const metadata = {
  title: 'Contact',
  description: 'Toutes les informations pour contacter Le chêne et ses racines.',
}

export default async function Contact() {
  const page = await getPageContent('contact')

  if (!page) {
    throw new Error(
      'Contenu de la page contact introuvable. Ajoutez content/pages/contact.md.',
    )
  }

  const content = parseContactContent(page.data)

  return (
    <Container className="mt-9">
      <div className="relative isolate bg-white dark:bg-amber-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-amber-100 ring-1 ring-amber-900/10 lg:w-1/2 dark:bg-amber-900 dark:ring-white/5">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full stroke-amber-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-amber-700"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    className="fill-amber-50 dark:fill-amber-800"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-amber-50 dark:fill-amber-800"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-amber-900 sm:text-5xl dark:text-white">
                {content.title}
              </h2>
              <dl className="mt-10 space-y-4 text-base/7 text-amber-700 dark:text-amber-300">
                {content.infoBlocks.map((block, index) => {
                  const key = `${block.heading ?? 'block'}-${index}`
                  const bodyValue = block.body?.trim()
                  const body = bodyValue ? bodyValue.split(/\r?\n/) : []

                  if (index === 0) {
                    return (
                      <div key={key} className="space-y-4">
                        {block.heading ? (
                          <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                            {block.heading}
                          </p>
                        ) : null}
                        <ContactLinkItem icon={BuildingOffice2Icon}>
                          <Address address={content.address} />
                        </ContactLinkItem>
                        <ContactLinkItem icon={PhoneIcon}>
                          <dd>
                            {content.phone?.href ? (
                              <Link
                                href={content.phone.href}
                                className="hover:text-amber-900 dark:hover:text-white"
                              >
                                {content.phone.label}
                              </Link>
                            ) : (
                              content.phone?.label
                            )}
                          </dd>
                        </ContactLinkItem>
                        <ContactLinkItem icon={EnvelopeIcon}>
                          <dd>
                            {content.email?.href ? (
                              <Link
                                href={content.email.href}
                                className="hover:text-amber-900 dark:hover:text-white"
                              >
                                {content.email.label}
                              </Link>
                            ) : (
                              content.email?.label
                            )}
                          </dd>
                        </ContactLinkItem>
                      </div>
                    )
                  }

                  const HeadingTag = block.heading ? 'p' : null
                  return (
                    <div key={key}>
                      {HeadingTag ? (
                        <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                          {block.heading}
                        </p>
                      ) : null}
                      {body.length > 0 ? (
                        <p className="mt-6 text-lg/8 text-amber-700 dark:text-amber-300">
                          {body.map((line, lineIndex) => (
                            <span key={`${key}-line-${lineIndex}`}>
                              {line}
                              {lineIndex < body.length - 1 ? <br /> : null}
                            </span>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>
          <ContactForm
            emailHref={content.email?.href || 'mailto:lechene77familles@gmail.com'}
            mapEmbedUrl={content.mapEmbedUrl}
          />
        </div>
      </div>
    </Container>
  )
}
