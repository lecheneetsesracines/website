# Visual guarantee, then upgrade everything: plan

Spec: [`docs/specs/2026-10-02-visual-guarantee-and-upgrade-design.md`](../specs/2026-10-02-visual-guarantee-and-upgrade-design.md) (decisions referenced as D1–D19) · Repo: `website` · Owner agent: `website-engineer` · One run, one PR · Tracker: GitHub Issues on lecheneetsesracines/website

## The problem, in the owner's words

> Create first an E2E test so we make sure all the design stays the same on each page; that will be our guarantee for the next works. Then update all libraries, including Next.js, to the latest stable versions, and fix all the security issues we might have.

## The solution, in the owner's words

First, a screenshot suite pins how every page looks today, at mobile, tablet and desktop sizes. It renders a frozen copy of the content, so the association's edits never break it. Then the dependencies move up in risk order: Tina and dead packages come out, in-range updates go in, then Next 16 and React 19. After every step the suite must still match the screenshots exactly. Last come the security fixes: content URLs are checked before they reach the page, and the site gets security headers and a Content-Security-Policy. It all ships as one PR, certified by one gate command on the final tree.

## User stories

1. As the site owner, I want the current design of every page pinned by screenshots at three screen sizes, so that any later change that alters the design is caught before it reaches production.
2. As the association's content editor, I want my edits to `content/` on GitHub never to fail the test suite, so that developers never have to block on a text change.
3. As the site owner, I want one command that certifies a tree: lint, types, unit tests, a real-content build and the screenshots. Then "green" means safe to merge into an auto-deploying `main`.
4. As the site owner, I want TinaCMS and the unused packages gone, so that the project carries no tooling nobody uses and none of its advisories.
5. As the site owner, I want every dependency on its latest stable version that the toolchain supports (Next 16, React 19, Tailwind 4.3), so that the site keeps receiving fixes and stays easy to work on.
6. As the site owner, I want `npm audit` to report nothing, or only advisories justified in the PR.
7. As a family contacting the association, I want my name, phone number and message to go only to the association's mailbox, even if a content file were tampered with, so that my personal data can't leak.
8. As a visitor, I want the contact map to be the real Google Maps embed and every link on the site to be a real link, so that a tampered content file can't frame a phishing page or run script.
9. As a visitor, I want the site to send browser security headers and a Content-Security-Policy, so that it can't be framed for clickjacking and injected content can't load or run anything.

## Seams

| Seam | What crosses it | Used by |
|---|---|---|
| **A. The rendered page.** Chromium driven by `@playwright/test` against `next build && next start` with `CONTENT_DIR=e2e/fixtures/content` on `E2E_PORT` (default 3100). Today there's no seam at all; this is the highest one possible. | Full-page screenshots, image-loaded assertions, the opened mobile menu (the `PopoverButton` labelled "Menu", `src/components/Header.tsx:101`), and response headers, CSP violations and console errors | slices 1–6 |
| **B. The real-content build.** `npm run build` with the default `content/` | Every page of the live content statically renders (`generateStaticParams` in `src/app/sections/[slug]/page.tsx:10`) | the gate |
| **C. `src/lib/safeUrl.ts`**, pure functions run with `node --test` | The allow-list edge cases (`javascript:`, `data:`, mixed case, whitespace, other hosts) that can't go through seam A, because fixtures are frozen after slice 1 (D8) | slice 5 |

**Where the content seam sits.** The content root is read in exactly two modules, `src/lib/articles.ts:33` (`sectionsDirectory`) and `src/lib/pages.ts:15` (`pagesDirectory`). Their only callers are the route files: `src/app/page.tsx:280-281`, `src/app/sections/page.tsx:27`, `src/app/sections/[slug]/page.tsx:11,23,40`, `src/app/contact/page.tsx:149` and `src/app/equipe/page.tsx:56,75`. Graph callers were confirmed with grep.

**Where content URLs enter.** They're already funneled through a few parse points, so the allow-list wraps those instead of every render site:
- `toLink` in `src/app/contact/page.tsx` (address, phone, email) and the `mapEmbedUrl` read just after it.
- The `contactInfo` object built in `Home()` (`src/app/page.tsx:298` onward, from `contactPhoneHref` / `contactEmailHref`).
- `emailHref` and `mapEmbedUrl` in `src/app/contact/ContactForm.tsx:41-54`.

## Slices

The slices form one chain, except 5 and 6, which run in parallel once 4 lands (their declared files are disjoint). The plan splits the spec's slice 5 in two along exactly that line; nothing else differs from the spec.

### 1. Visual guarantee: 34 baselines on today's tree

- **Content seam.** `src/lib/articles.ts` and `src/lib/pages.ts` resolve their root from `process.env.CONTENT_DIR`, defaulting to exactly `content` (D3). No other change to `src/`.
- **Fixtures.** `e2e/fixtures/content/` is a byte-identical copy of `content/` at the run's base commit.
- **Playwright.**
  - Add `@playwright/test` 1.63.0 as a devDependency and install the Chromium browser.
  - `playwright.config.ts`:
    - three projects, `mobile` 390×844, `tablet` 768×1024 and `desktop` 1440×900, Chromium only (D1, D2);
    - a `webServer` that builds and starts with `CONTENT_DIR=e2e/fixtures/content` on `E2E_PORT || 3100`, with `reuseExistingServer: false`;
    - a `snapshotPathTemplate` under `e2e/__screenshots__/` with project and platform in the path (D7);
    - `expect.toHaveScreenshot` set to `animations: 'disabled'`.
- **`e2e/pages.spec.ts`.**
  - **Pages:** the 11 routes `/`, `/sections`, the 6 `/sections/<slug>` (taken from the fixture filenames), `/equipe`, `/contact`, and a 404 at `/cette-page-n-existe-pas`.
  - **Network:** every request that doesn't go to the local server is aborted (D6).
  - **Before each capture:** scroll to the bottom and back, `await img.decode()` for every image, and wait one animation frame.
  - **Assertion:** every `img` must be `complete` with `naturalWidth > 0` (D5).
  - **Capture:** full page, with `img`, `iframe` and the footer copyright line (`src/components/Footer.tsx:31`) masked.
- **`e2e/mobile-menu.spec.ts`** (mobile project only). Click "Menu", wait for the panel, take a full-page screenshot.
- **Scripts and ignores.** `test:e2e` (`playwright test`) and `test:e2e:update` (`playwright test --update-snapshots`). `/test-results/` and `/playwright-report/` go in `.gitignore`.
- **Acceptance:**
  - 34 PNGs committed under `e2e/__screenshots__/`.
  - `npm run test:e2e` passes 3 consecutive times on this tree.
  - `npm run build` (real content), `npm run lint` and `npx tsc --noEmit` are clean.
  - The only `src/` changes are the content seam in `articles.ts` and `pages.ts`.
  - The task output records whether the built `/` HTML contains `<link rel="preload">` tags for the images `src/app/head.tsx` lists. Slice 4 needs that fact (D14).
- **This is the one task allowed to create baselines.**

### 2. Remove TinaCMS and dead dependencies

- **Uninstall:** `tinacms`, `@tinacms/cli`, `@tinacms/graphql`, `cheerio`, `feed` and `@types/webpack-env` (D10, D14).
- **Delete:** `tina/` (including `tina/__generated__/`), `public/tina/.gitignore`, and the `tina:dev` / `tina:build` scripts.
- **Ignore the leftover admin build.** Add `/public/tina/` to the root `.gitignore`. Once `public/tina/.gitignore` is gone, the main checkout's untracked local admin build (`public/tina/index.html`, `assets/`) would otherwise become committable, and then deployable.
- **Dead RSS link.** Remove the `alternates` RSS entry in `src/app/layout.tsx:15-19`, and the README's RSS claim ("intègre le flux RSS").
- **Harness files.**
  - `.claude/agents/website-engineer.md`: drop TinaCMS from the stack line and the `tina:build` instruction.
  - `AGENTS.md`: update the stack line and the `migration-engineer` row.
  - `grimoire.config.json`: remove the `tina/__generated__/**` graph exclude, and change the `migration-engineer` `use` to the `content/**/*.md` frontmatter shape.
- **`content/` is untouched.** Its `_template` keys stay, and `src/lib/pages.ts` keeps reading them harmlessly.
- **Acceptance:**
  - `npm ls tinacms @tinacms/cli @tinacms/graphql cheerio feed` finds nothing.
  - `grep -ri tina src package.json` finds nothing.
  - `npm run test:e2e` passes against the unchanged baselines.
  - Build, lint and tsc are clean.
  - The task output records the `npm audit` counts before and after.

### 3. In-range updates and non-breaking audit fixes

- **Bump within the current majors:**
  - `next` and `eslint-config-next` to 14.2.35;
  - `tailwindcss` and `@tailwindcss/postcss` to 4.3.3, `@tailwindcss/typography` to 0.5.20;
  - `@headlessui/react` to 2.2.10;
  - `prettier` to 3.9.9, `prettier-plugin-tailwindcss` to 0.8.1;
  - `eslint` to 8.57.1, `@types/react` / `@types/react-dom` to 18.3.x, `@types/node` to 20.19.x.
- **Then `npm audit fix`, never `--force`.**
- **No repo-wide reformat.** Prettier isn't run over the tree.
- **Acceptance:**
  - Only `package.json` and `package-lock.json` change.
  - `npm run test:e2e` passes against the unchanged baselines.
  - Build, lint and tsc are clean.
  - The task output records the audit counts.

### 4. Next 16, React 19 and the toolchain

- **Versions (D11–D13):**
  - `next` and `eslint-config-next` 16.3.8; `react` / `react-dom` 19.3.x; `@types/react` / `@types/react-dom` 19.x; `@types/node` 24.x.
  - `typescript` 6.0.3; `eslint` 9.39.x; `next-themes` 0.4.6.
  - Remove the `sharp` devDependency.
  - Add `"engines": { "node": "24.x" }`.
- **Code changes:**
  - `src/app/sections/[slug]/page.tsx`: `params` becomes `Promise<{ slug: string }>` and is awaited, in both `generateMetadata` and the page.
  - `src/app/providers.tsx:9`: `useRef<T>()` becomes `useRef<T | undefined>(undefined)`.
  - `src/app/head.tsx`: deleted if slice 1 recorded no preload tags. If it did, its preloads are ported to a supported API (D14).
  - `next.config.mjs`: `experimental.outputFileTracingIncludes` moves to the top level.
  - Only the `tsconfig.json` changes that `tsc` or `next build` actually require.
- **Lint.** It becomes `eslint .` with an `eslint.config.mjs` built on `eslint-config-next`'s flat core-web-vitals config; `.eslintrc.json` is deleted.
- **Bundler.** Turbopack is the default; fall back to `next build --webpack` only with evidence of a Turbopack-only failure, written down in the task output.
- **Final dependency pass.** `npm audit fix` once more.
- **README.** Update the stack (Next 16, React 19), the Node version (24) and the `lint` description.
- **Acceptance:**
  - The exact versions above are in the lockfile.
  - `npm run test:e2e` passes against the unchanged baselines.
  - `npm run lint`, `npx tsc --noEmit` and `npm run build` are clean.
  - `npm audit` reports zero, or every residual advisory is listed in the task output with why it can't be fixed and why it doesn't reach the deployed site.

### 5. Content URLs are allow-listed (F1, F2, F3, F7)

- **`src/lib/safeUrl.ts`:** `safeHref(url)`, allowing `http:`, `https:`, `mailto:` and `tel:` after trim and case-folding; `safeMailto(url)`, allowing `mailto:` only; `safeMapEmbed(url)`, allowing the prefix `https://www.google.com/maps/embed` only. Each returns `undefined` when rejected.
- **`src/lib/safeUrl.test.ts`** runs under `node --test`, with cases for `javascript:`, `JaVaScRiPt:`, leading whitespace, `data:`, `vbscript:`, protocol-relative `//evil`, other hosts for the map, and the values in today's content.
- **Wiring:**
  - `toLink` in `src/app/contact/page.tsx` and the `mapEmbedUrl` read go through them.
  - So do the `contactInfo` hrefs built in `Home()` (`src/app/page.tsx`).
  - In `src/app/contact/ContactForm.tsx`, `emailHref` falls back to the hard-coded `mailto:` when rejected; `mapEmbedUrl` renders no iframe when rejected; the iframe gets `referrerPolicy="strict-origin-when-cross-origin"` and a French `title` (D16).
- **Section pages.** `export const dynamicParams = false` in `src/app/sections/[slug]/page.tsx` and `Object.hasOwn` in `resolveSectionImages` (`src/lib/sectionImages.ts:42`) (D19).
- **Script.** Add `test:unit` (`node --test`) to `package.json`.
- **Acceptance:**
  - `npm run test:unit` is green.
  - `npm run test:e2e` passes against the unchanged baselines; today's content values all pass the allow-list.
  - An unknown slug returns the 404 page.
  - Lint and tsc are clean.

### 6. Security headers and Content-Security-Policy (F4, F6)

- **`next.config.mjs` `headers()`, for every route,** sets exactly the CSP and headers in D17. Only when `VERCEL_ENV=preview`, `https://vercel.live` is added to `script-src`, `connect-src` and `frame-src`.
- **Drop the unused `images.unsplash.com` `remotePatterns` entry** (F6).
- **`e2e/runtime.spec.ts`** (D18) runs on every project:
  - visits the 11 routes and opens the mobile menu on `mobile`;
  - fails on any `securitypolicyviolation` event (listened for in the page) or `console` error;
  - checks that `/` responds with the CSP and the four other headers, with the exact values from D17.
- **Acceptance:**
  - `npm run test:e2e` is green, including the new spec and the unchanged baselines.
  - Build, lint and tsc are clean.
  - The CSP string in the code matches D17 exactly.

## Gate (final tree, once, by the gate dispatch)

`npm run lint && npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e` (D9; configured in `grimoire.config.json`). After that, the PR. Its description lists the audit counts per slice, any residual advisories, the head.tsx finding, and the owner follow-ups from the spec (GitHub settings for F5 and the out-of-scope items).

## Rules every slice inherits

- After slice 1, nothing under `e2e/__screenshots__/` or `e2e/fixtures/` changes. A visual diff that can't be removed comes back as `NEEDS_CONTEXT` with the diff image attached (D8).
- No slice edits `content/`.
- Any change to the frontmatter shape the code reads must keep rendering every existing content file. That's `migration-engineer`'s lens, but this plan has no such change.
