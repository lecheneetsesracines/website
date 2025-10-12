import fs from 'node:fs/promises'
import path from 'node:path'

import fg from 'fast-glob'
import matter from 'gray-matter'

export interface ArticleWithSlug {
  title: string
  description: string
  author: string
  date: string
  slug: string
}

export interface SectionDocument extends ArticleWithSlug {
  body: string
  gallery: Array<{
    imageId: string
    alt?: string
  }>
}

const articleOrder = [
  'espace-rencontre',
  'valeurs',
  'mediation-equine',
  'parentalite',
  'cafe-des-parents',
  'therapies',
]

const sectionsDirectory = path.join(process.cwd(), 'content', 'sections')

async function loadSectionFromFile(relativePath: string): Promise<SectionDocument> {
  let absolutePath = path.join(sectionsDirectory, relativePath)
  let fileContents = await fs.readFile(absolutePath, 'utf8')
  let { data, content } = matter(fileContents)

  let slugFromFile = relativePath.replace(/\.md$/, '')
  let slug = typeof data.slug === 'string' && data.slug.length > 0 ? data.slug : slugFromFile

  return {
    slug,
    title: typeof data.title === 'string' && data.title.length > 0 ? data.title : slug,
    description:
      typeof data.description === 'string' && data.description.length > 0
        ? data.description
        : '',
    author:
      typeof data.author === 'string' && data.author.length > 0
        ? data.author
        : 'Le chêne et ses racines',
    date: typeof data.date === 'string' ? data.date : '',
    gallery:
      Array.isArray(data.gallery) && data.gallery.length > 0
        ? data.gallery
            .map((item) => {
              if (!item || typeof item !== 'object') {
                return null
              }

              let imageId = 'imageId' in item ? (item.imageId as string) : undefined
              let alt = 'alt' in item ? (item.alt as string | undefined) : undefined

              if (!imageId) {
                return null
              }

              return {
                imageId,
                alt,
              }
            })
            .filter(Boolean) as SectionDocument['gallery']
        : [],
    body: content.trim(),
  }
}

function sortArticles(articles: ArticleWithSlug[]) {
  return articles.sort((a, b) => {
    let indexA = articleOrder.indexOf(a.slug)
    let indexB = articleOrder.indexOf(b.slug)

    if (indexA === -1 && indexB === -1) {
      return a.slug.localeCompare(b.slug)
    }

    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  let files = await fg('*.md', { cwd: sectionsDirectory })
  let documents = await Promise.all(files.map(loadSectionFromFile))

  return sortArticles(documents)
}

export async function getSectionDocument(slug: string): Promise<SectionDocument | null> {
  try {
    let document = await loadSectionFromFile(`${slug}.md`)

    return document
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }

    throw error
  }
}
