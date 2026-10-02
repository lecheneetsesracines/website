import { expect, masks, stabilize, test } from './support'

// Runs in the mobile project only (testIgnore in playwright.config.ts): the
// "Menu" button is MobileNavigation's PopoverButton, shown below md.
test('the opened mobile menu matches its baseline', async ({ page }) => {
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
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
  )

  await expect(page).toHaveScreenshot('mobile-menu.png', {
    fullPage: true,
    mask: await masks(page, { coveredBy: panel }),
  })
})
