import fs from 'node:fs/promises'
import path from 'node:path'

import matter from 'gray-matter'

export interface PageContent {
  slug: string
  template?: string
  title?: string
  data: Record<string, unknown>
  body: string
}

const pagesDirectory = path.join(process.cwd(), 'content', 'pages')

export async function getPageContent(slug: string): Promise<PageContent | null> {
  let filePath = path.join(pagesDirectory, `${slug}.md`)

  try {
    let file = await fs.readFile(filePath, 'utf8')
    let { data, content } = matter(file)

    return {
      slug,
      template:
        typeof (data as Record<string, unknown>)._template === 'string'
          ? ((data as Record<string, unknown>)._template as string)
          : undefined,
      title: typeof data.title === 'string' ? data.title : undefined,
      data,
      body: content.trim(),
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }

    throw error
  }
}
