import Image from 'next/image'
import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import aneRencontre from '@/images/sections/mediation-equine/cheval-rencontre-2.jpeg'

export const metadata = {
  title: 'Médiation équine',
  description:
    "En fonction des situations familiales, les rencontres parent-enfant peuvent également s’effectuer au sein du centre équestre du Diamantnoir, à Champeaux (77), dans le cadre d’une médiation équine.",
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'mediation-equine',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        En fonction des situations familiales, les rencontres parent-enfant
        peuvent également s’effectuer au sein du centre équestre du Diamantnoir,
        à Champeaux (77), dans le cadre d’une médiation équine.
      </p>
      <p>
        Cette proposition est offerte si les professionnels, le ou les enfants
        ainsi que les parents le pensent possible. Ces séances de médiation
        équine, font parties du cadre de l’espace de rencontre, s’effectuent le
        samedi et sont encadrées par une monitrice d’équitation ainsi qu’une
        psychologue clinicienne.
      </p>
      <Image src={aneRencontre} alt="Ane rencontre" />
    </ArticleLayout>
  )
}
