import Image from 'next/image'
import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import cafeParent from '@/images/sections/cafe-des-parents/cafe-parent.webp'

export const metadata = {
  title: 'Café des parents',
  description:
    "Dédié aux parents hébergeants, c’est un espace convivial d’expression, de partage d’expériences et d’interrogations entre parents, dans un esprit d’écoute, de confidentialité et de respect de la parole de chacun autour d’un café.",
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'cafe-des-parents',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        Dédié aux parents hébergeants, c’est un espace convivial d’expression,
        de partage d’expériences et d’interrogations entre parents, dans un
        esprit d’écoute, de confidentialité et de respect de la parole de chacun
        autour d’un café.
      </p>
      <p>
        Etre père, être mère c’est un travail de chaque jour, un travail très
        difficile. La communication n’est pas toujours facile. Un enfant a
        besoin d’un père, a besoin d’une mère. Les parents ont des questions et
        des solutions. Nous proposons une mise en commun des expériences. Dans
        ce lieu, personne ne juge personne, et la confidentialité est assurée.
      </p>
      <Image src={cafeParent} alt="Café Parent" />
    </ArticleLayout>
  )
}
