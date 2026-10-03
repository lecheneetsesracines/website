import { defineConfig } from '@playwright/test'

// The suite renders a production build of the frozen fixture content
// (e2e/fixtures/content), never `next dev` and never the live content/.
const port = process.env.E2E_PORT || '3100'
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  // macOS baselines: the platform is part of the path.
  snapshotPathTemplate:
    '{testDir}/__screenshots__/{projectName}/{platform}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: true,
  // A retry would hide a flaky baseline.
  retries: 0,
  // An html reporter opens a server on failure, which would hang an unattended run.
  reporter: 'list',
  // Plain runs never write baselines; `test:e2e:update` (--update-snapshots) does.
  updateSnapshots: 'none',
  expect: {
    toHaveScreenshot: { animations: 'disabled' },
  },
  use: {
    baseURL,
    browserName: 'chromium',
    deviceScaleFactor: 1,
    colorScheme: 'light',
  },
  projects: [
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet',
      // The "Menu" button only exists below the md breakpoint.
      testIgnore: 'mobile-menu.spec.ts',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'desktop',
      testIgnore: 'mobile-menu.spec.ts',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    // Every page is statically prerendered, so CONTENT_DIR must reach the
    // build as well as the server.
    command: `npm run build && npm run start -- -p ${port}`,
    env: { CONTENT_DIR: 'e2e/fixtures/content' },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 300_000,
  },
})
