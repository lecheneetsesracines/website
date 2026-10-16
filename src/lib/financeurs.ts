import fs from 'node:fs/promises'
import path from 'node:path'

import { imageSize } from 'image-size'

// The funders on the home page come from the `financeurs` list in
// content/pages/home.md, and their logos from content/logos/, so the
// association can change both from the GitHub web editor. Any mistake fails
// the build with a message naming the entry: Vercel then keeps the previous
// deployment instead of shipping a broken image.

export interface Financeur {
  name: string
  logo: { src: string; width: number; height: number }
}

export const logosDirectory = path.join(
  process.cwd(),
  process.env.CONTENT_DIR || 'content',
  'logos',
)

// Served as /logos/<file>, so a name stays inside one URL segment.
const LOGO_FILE = /^[a-z0-9][a-z0-9._-]*\.(avif|gif|jpe?g|png|svg|webp)$/i

const CONTENT_TYPES: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
}

const SOURCE = 'content/pages/home.md'

export function isLogoFile(file: string): boolean {
  return LOGO_FILE.test(file)
}

export function logoContentType(file: string): string {
  let extension = path.extname(file).slice(1).toLowerCase()

  return CONTENT_TYPES[extension] ?? 'application/octet-stream'
}

export async function listLogoFiles(directory = logosDirectory): Promise<string[]> {
  try {
    return (await fs.readdir(directory)).filter(isLogoFile).sort()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }

    throw error
  }
}

export function parseFinanceurs(value: unknown): Array<{ name: string; logo: string }> {
  if (!Array.isArray(value)) {
    throw new Error(
      `${SOURCE}: \`financeurs\` must be a list of funders, each with a \`name\` and a \`logo\`.`,
    )
  }

  return value.map((entry: unknown, index) => {
    let label = `funder #${index + 1}`
    let { name, logo } = (entry ?? {}) as Record<string, unknown>

    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error(`${SOURCE}: ${label} has no \`name\`.`)
    }

    label = `${label} ("${name.trim()}")`

    if (typeof logo !== 'string' || logo.trim() === '') {
      throw new Error(`${SOURCE}: ${label} has no \`logo\`.`)
    }

    if (!isLogoFile(logo.trim())) {
      throw new Error(
        `${SOURCE}: ${label} has logo "${logo}". A logo is a file name in content/logos/, made of letters, digits, "-", "_" or ".", and ending in .svg, .png, .jpg, .jpeg, .webp, .gif or .avif.`,
      )
    }

    return { name: name.trim(), logo: logo.trim() }
  })
}

export async function loadFinanceurs(
  value: unknown,
  directory = logosDirectory,
): Promise<Financeur[]> {
  return Promise.all(
    parseFinanceurs(value).map(async ({ name, logo }, index) => {
      let label = `funder #${index + 1} ("${name}")`
      let file: Buffer

      try {
        file = await fs.readFile(path.join(directory, logo))
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new Error(
            `${SOURCE}: ${label} has logo "${logo}", but content/logos/ has no file by that name.`,
          )
        }

        throw error
      }

      let size: { width?: number; height?: number }

      try {
        size = imageSize(file)
      } catch {
        size = {}
      }

      if (!size.width || !size.height) {
        throw new Error(
          `${SOURCE}: ${label} has logo "${logo}", which is not a readable image.`,
        )
      }

      return {
        name,
        logo: { src: `/logos/${logo}`, width: size.width, height: size.height },
      }
    }),
  )
}
