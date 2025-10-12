import { Container } from '@/components/Container'
import { getPageContent } from '@/lib/pages'
import type { Metadata } from 'next'

interface Person {
  name: string
  role?: string
  bio?: string
}

interface TeamContent {
  title: string
  description?: string
  people: Person[]
}

function parseTeamContent(data: Record<string, unknown>): TeamContent {
  const peopleRaw = Array.isArray(data.people) ? data.people : []

  const people: Person[] = peopleRaw
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null
      }

      const { name, role, bio } = entry as {
        name?: unknown
        role?: unknown
        bio?: unknown
      }

      if (typeof name !== 'string' || name.length === 0) {
        return null
      }

      return {
        name,
        role: typeof role === 'string' ? role : undefined,
        bio: typeof bio === 'string' ? bio : undefined,
      }
    })
    .filter(Boolean) as Person[]

  return {
    title:
      typeof data.title === 'string' && data.title.length > 0
        ? data.title
        : 'Notre équipe',
    description:
      typeof data.description === 'string' ? data.description : undefined,
    people,
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('equipe')

  const description =
    page && typeof page.data.description === 'string'
      ? page.data.description
      : 'Découvrez notre équipe.'

  const title =
    page && typeof page.data.title === 'string'
      ? page.data.title
      : 'Équipe'

  return {
    title,
    description,
  }
}

export default async function TeamPage() {
  const page = await getPageContent('equipe')

  if (!page) {
    throw new Error(
      'Contenu de la page équipe introuvable. Ajoutez content/pages/equipe.md.',
    )
  }

  const { title, description, people } = parseTeamContent(page.data)

  return (
    <Container>
      <div className="bg-white py-24 sm:py-32 dark:bg-amber-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
              {title}
            </h2>
            {description ? (
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                {description}
              </p>
            ) : null}
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
                  {person.role ? (
                    <p className="text-base/7 text-gray-600 dark:text-gray-300">
                      {person.role}
                    </p>
                  ) : null}
                  {person.bio ? (
                    <p className="mt-6 text-base/7 text-gray-600 dark:text-gray-300">
                      {person.bio}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
