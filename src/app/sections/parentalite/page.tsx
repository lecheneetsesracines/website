import Image from 'next/image'
import Link from 'next/link'
import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import { Mail, Phone } from '@/components/SocialIcons'
import parentalite from '@/images/sections/parentalite/parentalite.webp'
import parentalite2 from '@/images/sections/parentalite/parentalite-2.webp'

export const metadata = {
  title: 'Parentalité',
  description:
    'Le soutien à la parentalité est proposé pour soutenir les parents et les familles qui sont en situation de rupture, en difficulté, ou en recherche de soutien.',
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'parentalite',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <h2>Plusieurs types d’entretiens sont possibles:</h2>
      <p>
        Des entretiens individuels pour permettre au parent d’exposer ses
        souffrances en toute liberté, et de repérer les éléments responsables de
        son mal être.
      </p>
      <p>
        Des entretiens du couple parental dans le cas où des conflits ou
        désaccords existeraient et impacteraient le développement de l’enfant.
        Nous aiderons les parents à exercer de façon consensuelle leur autorité
        parentale.
      </p>
      <p>
        Des entretiens familiaux pour développer la communication intrafamiliale
        par l’écoute, la parole ouvrant à l’élaboration et la mise en place de
        solutions qui améliorent le quotidien des parents et des enfants.
      </p>
      <Image src={parentalite} alt="Parentalité" />
      <p>
        Nous nous attachons à une écoute sans jugement du parent afin de lui
        offrir un soutien psychologique le plus adapté à sa situation ainsi
        qu’un accompagnement personnalisé dans ses fonctions de parents.
      </p>
      <Image src={parentalite2} alt="Parentalité" />
      <h2>Demande de rendez-vous :</h2>
      <Link
        className="group -m-1 flex w-fit items-center p-1"
        href="mailto:lechene77familles@gmail.com"
        aria-label="Envoyer nous un mail"
      >
        <Mail className="h-6 w-6 fill-amber-500 transition group-hover:fill-amber-600 dark:fill-amber-400 dark:group-hover:fill-amber-300" />
        <span className="ml-2">lechene77familles@gmail.com</span>
      </Link>
      <br />
      <Link
        className="group -m-1 flex w-fit items-center p-1"
        href="tel:06-95-60-52-21"
        aria-label="Appellez-nous"
      >
        <Phone className="h-6 w-6 fill-amber-500 transition group-hover:fill-amber-600 dark:fill-amber-400 dark:group-hover:fill-amber-300" />
        <span className="ml-2">06 95 60 52 21</span>
      </Link>
    </ArticleLayout>
  )
}
