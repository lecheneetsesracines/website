import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Mail, Map, Phone } from '@/components/SocialIcons'
import logoAnct from '@/images/logos/anct.jpg'
import logoAssurance from '@/images/logos/assurance.png'
import logoCamvs from '@/images/logos/camvs.jpg'
import logoMsa from '@/images/logos/msa.jpg'
import logoCaf from '@/images/logos/caf.svg'
import logoArs from '@/images/logos/ars.svg'
import logoReaap from '@/images/logos/reaap.jpg'
import logoCap from '@/images/logos/cap.jpg'
import logoRegion from '@/images/logos/region.png'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-amber-100 stroke-amber-400 dark:fill-amber-100/10 dark:stroke-amber-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-amber-400 dark:stroke-amber-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-amber-100 stroke-amber-400 dark:fill-amber-100/10 dark:stroke-amber-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-amber-400 dark:stroke-amber-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/sections/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>En savoir plus</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-amber-500 transition group-hover:fill-amber-600 dark:fill-amber-400 dark:group-hover:fill-amber-300" />
    </Link>
  )
}

function ContactInfo() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-300 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-amber-900 dark:text-amber-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Pour nous contacter</span>
      </h2>
      <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
        06 95 60 52 21
        <br />
        <span className="text-sm text-amber-700 dark:text-amber-400">
          lechene77familles@gmail.com
        </span>
      </p>
    </form>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
}

function Role({ role }: { role: Role }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-16 w-16 flex-none items-center justify-center rounded-full ring-1 shadow-md shadow-amber-800/5 ring-amber-900/5 dark:border dark:border-zinc-700/50 dark:bg-amber-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-14 w-14 rounded-full" />
      </div>
      <dl className="flex flex-auto flex-wrap items-center justify-center gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-amber-900 dark:text-amber-100">
          {role.company}
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: "Caisse d'Allocations Familiales",
      title: "Caisse d'Allocations Familiales",
      logo: logoCaf,
    },
    {
      company: "Cour d'appel de Paris",
      title: "Cour d'appel de Paris",
      logo: logoCap,
    },
    {
      company: 'CPAM',
      title: "Assurance Maladie, Caisse d'Allocations Familiales",
      logo: logoAssurance,
    },
    {
      company: "Communauté d'agglomération de Melun Val de Seine",
      title:
        'Caisse d’Allocations Familiales de Seine-et-Marne, Caisse d’Allocations Familiales',
      logo: logoCamvs,
    },
    {
      company: 'ANCT',
      title: 'Agence Nationale de la Cohésion des Territoires',
      logo: logoAnct,
    },
    {
      company: 'ARS',
      title: 'Agence Régionale de Santé',
      logo: logoArs,
    },
    {
      company: 'Font National Parentalité',
      title: 'le Réseau d’Ecoute, d’Appui et d’Accompagnement des Parents',
      logo: logoReaap,
    },
    {
      company: 'Région IDF',
      title: 'Région Île-de-France',
      logo: logoRegion,
    },
    {
      company: 'MSA77',
      title:
        "Mutualité Sociale Agricole de Seine-et-Marne, Caisse d'Allocations Familiales",
      logo: logoMsa,
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-300 p-6 dark:border-zinc-700/40">
      <div className="flex flex-col gap-2">
        <h2 className="flex text-sm font-semibold text-amber-900 dark:text-amber-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Nos financeurs</span>
        </h2>
        <span className="text-amber-900/60">
          Tous nos services sont non payants et financés par les partenaires
          suivants :
        </span>
      </div>
      <ol className="mt-6 h-96 space-y-4 overflow-y-auto">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-amber-100 sm:w-72 sm:rounded-2xl dark:bg-amber-800',
              //rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  let articles = await getAllArticles()

  return (
    <>
      <Container className="mt-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-amber-800 sm:text-5xl dark:text-amber-100">
            LE CHÊNE ET SES RACINES
          </h1>
          <p className="mt-6 text-base text-amber-700 dark:text-amber-400">
            Association dédiée au soutien des familles, nous offrons un cadre
            bienveillant et sécurisé pour accompagner les parents et les enfants
            dans la reconstruction de leurs liens. Notre équipe
            pluridisciplinaire est à l’écoute de chacun, avec pour objectif de
            favoriser l’apaisement, la confiance et l’autonomie dans le respect
            de chaque histoire.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="tel:06-95-60-52-21"
              aria-label="Appellez-nous"
              icon={Phone}
            />
            <SocialLink
              href="mailto:lechene77familles@gmail.com"
              aria-label="Envoyer nous un mail"
              icon={Mail}
            />
            <SocialLink
              target="_blank"
              href="https://www.google.com/maps?rlz=1C5CHFA_enFR977FR977&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQRRgnGDsyDAgCECMYJxiABBiKBTINCAMQLhivARjHARiABDIKCAQQABiABBiiBDIHCAUQABjvBTIKCAYQABiABBiiBDIGCAcQRRg80gEHMjEzajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=fr&sa=X&geocode=KaEvb0Gc-uVHMVYUQ6j61y9N&daddr=5+Pl.+Praslin,+77000+Melun"
              aria-label="Venez nous voir"
              icon={Map}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ContactInfo />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
