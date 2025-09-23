import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

async function importArticle(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  let { metadata } = (await import(`../app/sections/${articleFilename}`)) as {
    metadata: Article
  }

  return {
    slug: articleFilename.replace(/(\/page)?\.tsx$/, ''),
    ...metadata,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob('*/page.tsx', {
    cwd: './src/app/sections',
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  // Define the desired order of articles
  const articleOrder = [
    'espace-rencontre',
    'valeurs',
    'mediation-equine',
    'parentalite',
    'cafe-des-parents',
    'therapies',
  ]

  // Sort articles according to the defined order
  return articles.sort((a, b) => {
    const indexA = articleOrder.indexOf(a.slug)
    const indexB = articleOrder.indexOf(b.slug)

    // If article not found in order array, put it at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
}
