import { type Metadata } from 'next'

import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Équipe',
  description: 'Découvrez notre équipe.',
}

const people = [
  {
    name: 'DUSSART Nora',
    role: 'BUREAU',
    bio: 'Présidente. Co-fondatrice de l’association, psychologue clinicienne et ancienne intervenante.',
  },
  {
    name: 'DAUBOURG Véronique',
    role: 'BUREAU',
    bio: "Trésorière. Co-fondatrice de l'association, psychologue en milieu scolaire et ancienne intervenante.",
  },
  {
    name: 'NGUIMBOUS Désiré',
    role: 'BUREAU',
    bio: 'Trésorière Adjointe. Psychologue clinicienne et ancienne intervenante.',
  },
  {
    name: 'PEIFFER Eléonore',
    role: 'BUREAU',
    bio: 'Secrétaire. Avocate associée au Barreau de la Seine-Saint-Denis, spécialisée dans le domaine du droit des étrangers appliqué aux mineurs et jeunes majeurs isolés étrangers.',
  },
  {
    name: 'CYRKLEWSKI PALACIO Laura',
    role: 'PÔLE DE COORDINATION',
    bio: "Co-fondatrice de l'association. Psychologue clinicienne, titulaire d’un diplôme de psychologie ainsi que d’un Master de psychologie spécialité développement de l’enfant et de l’adolescent de l’Université de Paris. Formée au psycho-trauma, thérapie EMDR – Institut Français d’EMDR.",
  },
  {
    name: 'OUHIBI Sonia',
    role: 'PÔLE DE COORDINATION',
    bio: 'Psychologue clinicienne. Titulaire d’un Master de psychologie spécialité psychopathologie clinique psychanalytique. Parcours : interculturel, transculturel à Paris13 Sorbonne.',
  },
  {
    name: 'GUICHE Emmanuelle',
    role: 'PÔLE DE COORDINATION',
    bio: 'Psychologue en milieu scolaire, titulaire d’un Master de psychologie de Paris V Descartes spécialité psychologie clinique et psychopathologie et praticienne en médiation équine.',
  },
  {
    name: 'CYRKLEWSKI Nicolas',
    role: 'PÔLE DE COORDINATION',
    bio: "Responsable administratif de l'association, ancien éducateur spécialisé et éducateur sportif auprès de jeunes atteints de troubles autistiques.",
  },
  {
    name: 'LANGLOIS Claire',
    role: 'INTERVENANTS',
    bio: "Responsable du secrétariat, elle assure le premier lien avec les bénéficiaires de l'association pour gérer les démarches logistiques.",
  },
  {
    name: 'NOUREDDINE Hind',
    role: 'INTERVENANTS',
    bio: 'Psychologue clinicienne et psychothérapeute en libéral, titulaire d’un Master de psychologie de Paris13 Sorbonne spécialité psychopathologie clinique psychanalytique.',
  },
  {
    name: 'MUNOZ Paulina',
    role: 'INTERVENANTS',
    bio: 'Psychologue clinicienne, titulaire d’un Master de psychologie de Paris Ouest Nanterre la Défense, titulaire du Master Psychologie de l’enfance, de l’adolescence et des institutions.',
  },
  {
    name: 'DESMOULINS Rachel',
    role: 'INTERVENANTS',
    bio: 'Psychologue libérale, ancienne enseignante et titulaire d’un Master de psychologie du CNAM spécialité travail, santé et parcours professionnels.',
  },
  {
    name: 'DELAROCHE Stéphane',
    role: 'INTERVENANTS',
    bio: "Educateur spécialisé diplômé d'état et formé à la sophrologie.",
  },
  {
    name: 'BARS-VALEYRE Nathalie',
    role: 'INTERVENANTS',
    bio: "Psychologue en milieu scolaire, titulaire d’un diplôme d'état de psychologie scolaire de Paris IV Sorbonne.",
  },
  {
    name: 'TISSEAU Fanny',
    role: 'INTERVENANTS',
    bio: "Psychologue en milieu scolaire, titulaire d’un Master de psychologie du CNAM spécialité pratiques de l'orientation professionnelle.",
  },
  {
    name: 'LAURENT Christine',
    role: 'INTERVENANTS',
    bio: 'Monitrice d’équitation. Professeur des écoles puis enseignante spécialisée. ',
  },
  {
    name: 'BRITO Anthony',
    role: 'INTERVENANTS',
    bio: "Educateur spécialisé diplômé d'état.",
  },
  {
    name: 'MICHEL Jessica',
    role: 'INTERVENANTS',
    bio: "Educatrice spécialisée diplômée d'état et en formation de psychologue.",
  },
  {
    name: 'NEMECKOVA Iva',
    role: 'INTERVENANTS',
    bio: 'Educatrice spécialisée, titulaire d’un Master1 en pédagogie spécialisée de Charles IV de Prague et praticienne en médiation équine.',
  },
]

export default function team() {
  return (
    <Container>
      <div className="bg-white py-24 sm:py-32 dark:bg-amber-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              Notre équipe
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
              Découvrez les membres de notre équipe. Chaque membre de notre
              équipe apporte une contribution unique et précieuse à notre
              mission.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-base/7 text-gray-600 dark:text-gray-300">
                    {person.role}
                  </p>
                  <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-300">
                    {person.bio}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
