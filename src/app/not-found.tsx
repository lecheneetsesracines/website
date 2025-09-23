import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <div className="flex flex-col items-center">
        <p className="text-base font-semibold text-amber-400 dark:text-amber-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-amber-800 sm:text-5xl dark:text-amber-100">
          Page introuvable
        </h1>
        <p className="mt-4 text-base text-amber-700 dark:text-amber-400">
          Désolé, nous n’avons pas pu trouver la page que vous recherchez.
        </p>
        <Button href="/" variant="secondary" className="mt-4">
          Retourner à l&apos;accueil
        </Button>
      </div>
    </Container>
  )
}
