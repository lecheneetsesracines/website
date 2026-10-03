import { expect, test as base, type Locator, type Page } from '@playwright/test'

export { expect }

// Every test runs offline (D6): a request that doesn't go to the local server
// (the Google Maps iframe on /contact, any remote image) is aborted.
export const test = base.extend<{ blockExternalRequests: void }>({
  blockExternalRequests: [
    async ({ page, baseURL }, use) => {
      if (!baseURL) {
        throw new Error(
          'The e2e suite needs `use.baseURL` (playwright.config.ts)',
        )
      }

      let localOrigin = new URL(baseURL).origin

      await page.route('**/*', (route) =>
        new URL(route.request().url()).origin === localOrigin
          ? route.continue()
          : route.abort(),
      )
      await use()
    },
    { auto: true },
  ],
})

// The Header's mount effect (src/components/Header.tsx) pins the header's
// height through CSS variables on <html> and attaches the scroll handler.
// Before it runs the page isn't hydrated yet: the header's geometry still
// changes and a click on the "Menu" button would be lost.
async function waitForHydration(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          document.documentElement.style.getPropertyValue('--header-position'),
        ),
      { message: 'the Header has mounted (the page is hydrated)' },
    )
    .toBe('sticky')
}

// Walks the page down one viewport at a time, so every lazy `next/image`
// comes near the viewport and starts loading, then returns to the top so
// the sticky header is in its resting place.
async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    let nextFrame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    let scroller = document.scrollingElement ?? document.documentElement

    for (let top = 0; top < scroller.scrollHeight; top += window.innerHeight) {
      window.scrollTo({ top, behavior: 'instant' })
      await nextFrame()
    }

    window.scrollTo({ top: scroller.scrollHeight, behavior: 'instant' })
    await nextFrame()
    window.scrollTo({ top: 0, behavior: 'instant' })
    await nextFrame()
  })
}

// Brings the page to a deterministic state before a capture (D5, D6):
// hydrated, every image loaded (and asserted to have loaded) and decoded,
// scrolled back to the top, one animation frame later.
export async function stabilize(page: Page) {
  await waitForHydration(page)
  await scrollThroughPage(page)

  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map((img) => img.currentSrc || img.src || img.outerHTML),
        ),
      { message: 'every image has finished loading' },
    )
    .toEqual([])

  await page.evaluate(async () => {
    // A broken image rejects decode(); the assertion below reports it.
    await Promise.allSettled(Array.from(document.images, (img) => img.decode()))
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  })

  let notLoaded = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => !(img.complete && img.naturalWidth > 0))
      .map((img) => img.currentSrc || img.src || img.outerHTML),
  )

  expect(notLoaded, 'every image loads (complete, naturalWidth > 0)').toEqual(
    [],
  )
}

// Photos and embeds are masked, so their box stays pinned while their pixels
// are ignored (D5). The footer's only paragraph holds the copyright year,
// baked in at build time (src/components/Footer.tsx).
//
// A mask paints the element's whole box on top of everything, whatever clips
// or covers it. So an image whose pixels can never reach the screenshot is
// left unmasked, or its mask would paint over real page pixels:
// - its box lies entirely outside an ancestor that clips its overflow (the
//   funders' logos scrolled out of their `overflow-y-auto` list on /);
// - its box lies entirely inside `coveredBy`, an opaque element on top of it
//   (the opened mobile menu panel over the home page's avatar).
export async function masks(
  page: Page,
  { coveredBy }: { coveredBy?: Locator } = {},
): Promise<Locator[]> {
  let cover = coveredBy
    ? await coveredBy.evaluate((element) => {
        let { left, top, right, bottom } = element.getBoundingClientRect()
        return { left, top, right, bottom }
      })
    : null

  let images = page.locator('img')
  let reachesScreenshot = await images.evaluateAll(
    (imgs, cover) =>
      imgs.map((img) => {
        let box = img.getBoundingClientRect()

        if (
          cover &&
          box.left >= cover.left &&
          box.top >= cover.top &&
          box.right <= cover.right &&
          box.bottom <= cover.bottom
        ) {
          return false
        }

        for (let el = img.parentElement; el; el = el.parentElement) {
          let style = getComputedStyle(el)
          let clip = el.getBoundingClientRect()
          let clipsX = style.overflowX !== 'visible'
          let clipsY = style.overflowY !== 'visible'

          if (
            (clipsX && (box.right <= clip.left || box.left >= clip.right)) ||
            (clipsY && (box.bottom <= clip.top || box.top >= clip.bottom))
          ) {
            return false
          }
        }

        return true
      }),
    cover,
  )

  return [
    ...reachesScreenshot.flatMap((reaches, index) =>
      reaches ? [images.nth(index)] : [],
    ),
    page.locator('iframe'),
    page.locator('footer p'),
  ]
}
