import Image from 'next/image'
import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import therapie from '@/images/sections/therapies/therapie.webp'

export const metadata = {
  title: 'Thérapies',
  description:
    "En dehors d’une mesure judiciaire, il est possible de proposer un suivi thérapeutique. Cliquez ici pour plus d’informations.",
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'therapies',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        À partir d’un adressage, il est envisageable de proposer un accompagnement
        thérapeutique pour enfants, adolescents et adulte. Ce cadre est proposé en
        dehors des ordonnances judiciaires et des mesures en cours. Les thérapies
        se déroulent à partir de souhaits formulés par le patient, puis une
        régularité de séance est proposée. Ce soutien et cette écoute doivent
        permettre d’être un lieu dédié aux problématiques et à leurs explorations
        par le patient et le psychologue.
      </p>
      <Image src={therapie} alt="Thérapies" />
      <p>Pour plus d’information, veuillez nous contacter par téléphone ou par mail.</p>
    </ArticleLayout>
  )
}
