import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/sections/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>En savoir plus</Card.Cta>
      </Card>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Index',
  description: 'Découvrez toutes les sections du site.',
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout title="Index" intro="Découvrez toutes les sections du site.">
      <div className="md:border-l md:border-zinc-300 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
