import fs from 'node:fs'
import path from 'node:path'

import { expect, masks, stabilize, test } from './support'

// The section pages are the fixture's section files, so the suite follows
// the frozen content instead of a hard-coded list.
const sectionSlugs = fs
  .readdirSync(path.join(__dirname, 'fixtures', 'content', 'sections'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.slice(0, -'.md'.length))
  .sort()

const pages: Array<{ path: string; name: string; status: number }> = [
  { path: '/', name: 'home', status: 200 },
  { path: '/sections', name: 'sections', status: 200 },
  ...sectionSlugs.map((slug) => ({
    path: `/sections/${slug}`,
    name: `sections-${slug}`,
    status: 200,
  })),
  { path: '/equipe', name: 'equipe', status: 200 },
  { path: '/contact', name: 'contact', status: 200 },
  // Served by src/app/not-found.tsx.
  { path: '/cette-page-n-existe-pas', name: 'not-found', status: 404 },
]

for (let { path: pagePath, name, status } of pages) {
  test(`${pagePath} matches its baseline`, async ({ page }) => {
    let response = await page.goto(pagePath)

    expect(response?.status()).toBe(status)

    await stabilize(page)
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: await masks(page),
    })
  })
}
