import Image from 'next/image'
import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import espaceRencontre from './espace-rencontre.jpg'
import espaceRencontreCuisine from './espace-rencontre-2.jpg'

export const metadata = {
  title: 'Espace rencontre',
  description:
    "L’Espace de Rencontre a pour objet d’accueillir, d’accompagner et de soutenir les familles en situation de rupture et/ou de difficulté. Le but de notre accompagnement est de protéger et/ou de restaurer les liens familiaux dans l’intérêt de l’enfant et de donner ou redonner de la confiance aux parents dans leurs capacités parentales.",
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'espace-rencontre',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        Un Espace de Rencontre est un lieu neutre et confidentiel qui, dans le
        cadre d&apos;une séparation, permet la rencontre entre le ou les enfants et
        le parent avec lequel ils ne vivent pas.
      </p>
      <Image src={espaceRencontre} alt="Espace rencontre" />
      <p>
        L’accueil des familles se fait dans un cadre contenant, neutre et
        bienveillant permettant aux parents et aux enfants de se rencontrer dans
        un milieu sécurisant physiquement et psychiquement.
      </p>
      <Image src={espaceRencontreCuisine} alt="Espace cuisine" />
    </ArticleLayout>
  )
}
