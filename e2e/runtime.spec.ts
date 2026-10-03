import fs from 'node:fs'
import path from 'node:path'

import type { Page } from '@playwright/test'

import { expect, stabilize, test } from './support'

declare global {
  interface Window {
    // Filled by the init script in watchRuntime().
    __cspViolations: string[]
  }
}

// The same 11 routes as pages.spec.ts: the section pages are the fixture's
// section files.
const sectionSlugs = fs
  .readdirSync(path.join(__dirname, 'fixtures', 'content', 'sections'))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.slice(0, -'.md'.length))
  .sort()

const pages: Array<{ path: string; status: number }> = [
  { path: '/', status: 200 },
  { path: '/sections', status: 200 },
  ...sectionSlugs.map((slug) => ({ path: `/sections/${slug}`, status: 200 })),
  { path: '/equipe', status: 200 },
  { path: '/contact', status: 200 },
  // Served by src/app/not-found.tsx.
  { path: '/cette-page-n-existe-pas', status: 404 },
]

// Decision 17, written out here rather than imported from next.config.mjs, so
// this spec checks the config instead of restating it.
const securityHeaders = {
  'content-security-policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
}

const noProblems = { cspViolations: [], consoleErrors: [], pageErrors: [] }

// Records everything that breaks at runtime, from before the page's first
// script runs: CSP violations (as "<directive> <blocked URI>"), console
// errors and uncaught exceptions. Call it before page.goto().
async function watchRuntime(page: Page) {
  await page.addInitScript(() => {
    window.__cspViolations = []
    document.addEventListener('securitypolicyviolation', (event) => {
      window.__cspViolations.push(
        `${event.violatedDirective} ${event.blockedURI}`,
      )
    })
  })

  let consoleErrors: Array<{ text: string; url: string }> = []
  let pageErrors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push({ text: message.text(), url: message.location().url })
    }
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))

  return {
    // `status` is the document's HTTP status. A 404 document makes Chromium
    // itself log "Failed to load resource: the server responded with a
    // status of 404 (Not Found)" for the page's own URL; that one message is
    // the not-found route working, not breaking.
    async problems(status: number) {
      return {
        cspViolations: await page.evaluate(() => window.__cspViolations),
        consoleErrors: consoleErrors
          .filter(
            ({ text, url }) =>
              !(
                status === 404 &&
                /status of 404/.test(text) &&
                url === page.url()
              ),
          )
          .map(({ text }) => text),
        pageErrors,
      }
    },
  }
}

for (let { path: pagePath, status } of pages) {
  test(`${pagePath} runs without a CSP violation or a console error`, async ({
    page,
  }) => {
    let runtime = await watchRuntime(page)
    let response = await page.goto(pagePath)

    expect(response?.status()).toBe(status)

    await stabilize(page)

    expect(await runtime.problems(status)).toEqual(noProblems)
  })
}

test('the opened mobile menu runs without a CSP violation or a console error', async ({
  page,
}) => {
  test.skip(
    test.info().project.name !== 'mobile',
    'The "Menu" button only exists below the md breakpoint',
  )

  let runtime = await watchRuntime(page)
  let response = await page.goto('/')

  expect(response?.status()).toBe(200)

  // stabilize() waits for hydration, so the click isn't lost.
  await stabilize(page)
  await page.getByRole('button', { name: 'Menu', exact: true }).click()

  let panel = page.locator('[id^="headlessui-popover-panel-"]')

  await expect(panel.getByRole('heading', { name: 'Navigation' })).toBeVisible()
  // Headless UI marks an element `data-transition` until its enter
  // transition has finished.
  await expect(page.locator('[data-transition]')).toHaveCount(0)

  expect(await runtime.problems(200)).toEqual(noProblems)
})

test('/ responds with the security headers of decision 17', async ({
  page,
}) => {
  let response = await page.goto('/')

  expect(response?.status()).toBe(200)

  let headers = response?.headers() ?? {}

  expect(
    Object.fromEntries(
      Object.keys(securityHeaders).map((name) => [name, headers[name]]),
    ),
  ).toEqual(securityHeaders)
})

// The negative control: a green run above means "nothing broke", not "the
// watcher never fires". script-src only allows 'self', so a cross-origin
// script is blocked before any request is made, reported as a violation and
// logged as a console error.
test('a blocked script reaches the watcher', async ({ page }) => {
  let runtime = await watchRuntime(page)
  let response = await page.goto('/')

  expect(response?.status()).toBe(200)

  await page.evaluate(() => {
    let script = document.createElement('script')
    script.src = 'https://example.com/injected.js'
    document.head.append(script)
  })

  await expect
    .poll(() => runtime.problems(200))
    .toEqual({
      cspViolations: ['script-src-elem https://example.com/injected.js'],
      consoleErrors: [
        "Loading the script 'https://example.com/injected.js' violates the following Content Security Policy directive: \"script-src 'self' 'unsafe-inline'\". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback. The action has been blocked.",
      ],
      pageErrors: [],
    })
})
