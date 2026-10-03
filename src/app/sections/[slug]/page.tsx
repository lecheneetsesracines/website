import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { ArticleLayout } from '@/components/ArticleLayout'
import { getAllArticles, getSectionDocument } from '@/lib/articles'
import { resolveSectionImages } from '@/lib/sectionImages'

// Only the slugs generateStaticParams lists exist: any other slug is a static
// 404, never a runtime read of content/sections/ (D19).
export const dynamicParams = false

export async function generateStaticParams() {
  let articles = await getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params
  let doc = await getSectionDocument(slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title ?? slug,
    description: doc.description ?? '',
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let { slug } = await params
  let doc = await getSectionDocument(slug)

  if (!doc) {
    notFound()
  }

  let gallery = resolveSectionImages(doc.gallery)

  let article = {
    slug: doc.slug ?? slug,
    title: doc.title ?? slug,
    description: doc.description ?? '',
    author: 'Le chêne et ses racines',
    date: '',
  }

  return (
    <ArticleLayout article={article}>
      {doc.body ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
      ) : null}
      {gallery.length > 0 ? (
        <div className="mt-10 space-y-8">
          {gallery.map(({ image, alt, id }) => (
            <Image
              key={id}
              src={image}
              alt={alt}
              className="w-full rounded-2xl bg-amber-50 object-cover dark:bg-amber-800"
              sizes="(min-width: 1024px) 48rem, 100vw"
            />
          ))}
        </div>
      ) : null}
    </ArticleLayout>
  )
}
