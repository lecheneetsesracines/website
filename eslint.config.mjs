import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    // react-hooks/refs: usePrevious reads ref.current during render on purpose, to hand the ArticleLayout back button the previous pathname.
    files: ['src/app/providers.tsx'],
    rules: { 'react-hooks/refs': 'off' },
  },
  {
    // react-hooks/set-state-in-effect: ThemeToggle's setMounted(true) is the hydration-safe "mounted" flag next-themes documents.
    files: ['src/components/Header.tsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
  {
    // @next/next/no-location-assign-relative-destination: the form opens a mailto: link, not a Next.js page; the rule cannot see through `${target}`.
    files: ['src/app/contact/ContactForm.tsx'],
    rules: { '@next/next/no-location-assign-relative-destination': 'off' },
  },
  globalIgnores([
    // eslint-config-next's own defaults, restated so the whole list reads here.
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Local-only output (all gitignored) that `eslint .` would otherwise walk.
    'test-results/**',
    'playwright-report/**',
    '.grimoire/**',
    // Stale TinaCMS admin bundle some checkouts still hold: minified, and big
    // enough to exhaust ESLint's heap.
    'public/tina/**',
  ]),
])
