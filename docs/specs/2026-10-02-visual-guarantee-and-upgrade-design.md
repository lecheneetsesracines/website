# Visual guarantee, then upgrade everything: design

Status: approved by roast, 2026-10-02 · Repo: `website` · One grimoire run, one PR · Tracker: GitHub Issues on lecheneetsesracines/website

## Problem

The site runs Next.js 14.2.3, React 18 and Tailwind 4.0, has 52 open npm advisories (5 critical, 29 high), and has no tests at all. Every push to `main` deploys straight to Vercel Production with no staging and no CI. Upgrading the framework two majors without a safety net means design regressions would be found by visitors.

## Goals

1. A visual-regression suite that pins the current rendered design of every page, captured on today's pre-upgrade tree, so it guarantees this upgrade and every later piece of work.
2. Every dependency on its latest stable version that the toolchain supports, Next.js included.
3. Zero `npm audit` advisories (or each remaining one justified in the PR), and the real application-level security findings fixed.

## Non-goals

- CI (GitHub Actions): the suite and gate run locally on macOS for now.
- Cross-browser coverage, dark mode (the theme is forced to light, `src/app/providers.tsx:52`), interaction states beyond the mobile menu.
- Any redesign, copy change or content edit. The frontmatter of `content/**/*.md` is not rewritten.
- Implementing an RSS feed, adopting Tina Cloud, or replacing GitHub as the content editor.

## Decisions

1. **Screenshot tool: `@playwright/test` (1.63, Chromium only)** with `toHaveScreenshot`, full page. *Rejected:* cross-browser, since the upgrade changes the framework, not the engines, and WebKit/Firefox would triple the baselines without catching upgrade regressions. *Rejected:* a hosted visual service, which means a vendor, an account and network access for a gate that has to run locally.
2. **Coverage: 11 pages × 3 viewports**, mobile 390×844, tablet 768×1024 and desktop 1440×900 (owner's call), plus the mobile navigation opened at 390×844. That's 34 baselines. Pages: `/`, `/sections`, the 6 `/sections/<slug>` pages, `/equipe`, `/contact`, and the 404 at an unknown path.
3. **The suite renders a frozen fixture copy of the content (owner's call).** Today's `content/` (at `ea25b84`) is copied to `e2e/fixtures/content/`. `src/lib/articles.ts` and `src/lib/pages.ts` resolve their directory from a `CONTENT_DIR` env var that defaults to exactly `content`, so production is unchanged. The suite's web server builds and starts with `CONTENT_DIR=e2e/fixtures/content`. *Rejected:* real content, because the association edits `content/` on `main` about once a month and every edit would break the baselines, making a design regression hard to tell from a text change.
4. **The suite runs against a production build** (`next build && next start` on port `E2E_PORT`, default 3100), never `next dev`. Dev mode differs in CSS ordering and overlays, and 3100 avoids colliding with a running dev server on 3000.
5. **Photos and embeds are masked; their geometry is not.** `img` and `iframe` elements, plus the footer's copyright year (`new Date().getFullYear()` in `src/components/Footer.tsx:31`), are masked. A Playwright mask paints the element's box, so its position and size stay pinned while its pixels are ignored. A separate assertion requires every `img` to load (`complete && naturalWidth > 0`). *Rejected:* comparing photos unmasked with a tolerance. Re-encoding changes when `sharp` and Next's optimizer change, so any tolerance loose enough to absorb that would also absorb real text and spacing shifts, and the unattended gate would flake.
6. **Deterministic capture.** `animations: 'disabled'`. Before each capture: scroll to the bottom and back so lazy `next/image` elements load, wait for every `img.decode()` and one animation frame, and block every request that doesn't go to the local server (the Google Maps iframe, any remote image). The suite runs offline.
7. **Baselines are created once, in slice 1, on the pre-upgrade tree, and proven stable.** The suite must pass 3 consecutive runs before the baselines are committed. Snapshot paths include the platform, so these are macOS baselines.
8. **After slice 1, no task may update a baseline.** An implementer that cannot remove a visual diff returns `NEEDS_CONTEXT` with the diff image attached. Accepting a visual change is always the owner's call. The spec reviewer fails any diff after slice 1 that touches `e2e/__screenshots__/` or `e2e/fixtures/`.
9. **Gate on the final tree:** `npm run lint && npx tsc --noEmit && npm run test:unit && npm run build && npm run test:e2e`. `npm run build` runs on the real `content/` and proves every live page still renders, because all pages are statically generated. `test:e2e` builds again on the fixtures and compares. Implementers may run `npm run test:e2e` while they work; it's their verification loop for an upgrade. They never run it with `--update-snapshots` (except in slice 1) and never open the PR.
10. **TinaCMS is removed (owner's call):** `tinacms`, `@tinacms/cli`, `@tinacms/graphql`, `tina/` (including `tina/__generated__/`), `public/tina/.gitignore`, and the `tina:dev` / `tina:build` scripts. `src/` never imports Tina: pages read Markdown with `gray-matter`. The admin isn't deployed and Tina Cloud isn't configured. Tina is the source of 4 of the 5 critical advisories. *Rejected:* upgrading to tinacms 3 / CLI 4, which keeps a local editor nobody uses and adds a Node 22/24-only CLI.
11. **Version targets, from peer ranges checked on 2026-10-02:**
    - **Next.js and React:** `next` and `eslint-config-next` 16.3.8, `react`/`react-dom` 19.3, `@types/react`/`-dom` 19.
    - **TypeScript: 6.0.3, not 7.0.2.** `eslint-config-next` 16 depends on `typescript-eslint`, which peers `typescript >=4.8.4 <6.1.0`.
    - **ESLint: latest 9.x, not 10.** `eslint-plugin-react` (`^9.7`), `eslint-plugin-import` (`^9`) and `eslint-plugin-jsx-a11y` (`^9`) do not accept 10.
    - **Everything else:** `@types/node` 24.x, to match the Node runtime (decision 12) rather than 26. `next-themes` 0.4.6, `@headlessui/react` 2.2.10, `tailwindcss`/`@tailwindcss/postcss` 4.3.3, `@tailwindcss/typography` 0.5.20, `prettier` 3.9.9, `prettier-plugin-tailwindcss` 0.8.1.
    - **Removed:** the explicit `sharp` devDependency, since Next 16 ships `sharp ^0.35.4` as an optional dependency.
12. **Node 24 made explicit:** `"engines": { "node": "24.x" }` in `package.json`. Next 16 needs Node ≥ 20.9, and the Vercel project's Node setting can't be read from this workspace. Pinning makes the production runtime match the gate's (local Node 24.14).
13. **Lint moves to ESLint flat config.** `next lint` no longer exists in Next 16, so `lint` becomes `eslint .` with an `eslint.config.mjs` built on `eslint-config-next`'s flat `core-web-vitals` export, and `.eslintrc.json` is deleted.
14. **Dead code and dependencies go:**
    - `cheerio`, `feed` and `@types/webpack-env` have no importer in `src/`.
    - The `alternates` RSS link in `src/app/layout.tsx:15-19` points at a `/feed.xml` route that doesn't exist; it's removed along with the README's RSS claim.
    - `src/app/head.tsx` is checked against the pre-upgrade build's HTML. If App Router ignores it, it's deleted; if its preloads are real, they're ported to supported APIs. Either way it can't stay as-is, because it uses the global `JSX` namespace, which React 19's types removed.
15. **Upgrade in risk order, each step verified by the suite** (the slices below), rather than one big-bang bump. Each slice leaves the tree green, so a failure points at one step.
16. **Every content-supplied URL goes through an allow-list before it reaches the DOM** (owner's call: fix all findings). It lives in one helper, `src/lib/safeUrl.ts`:
    - The form's `email.href` must be `mailto:`, otherwise it falls back to the hard-coded address.
    - `mapEmbedUrl` must start with `https://www.google.com/maps/embed`, otherwise no iframe is rendered.
    - Link `href`s must be `http:`, `https:`, `mailto:` or `tel:`, otherwise the link is dropped and its text kept.
    - The iframe gets `referrerPolicy="strict-origin-when-cross-origin"` and a French `title`. *Rejected:* `sandbox` on the Maps embed, because the embed needs `allow-scripts allow-same-origin allow-popups`, which removes most of its value.
17. **Security headers with an enforcing Content-Security-Policy (owner's call).** They're set in `next.config.mjs` `headers()` for every route:
    - **The CSP:** `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`.
    - **Other headers:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and `Permissions-Policy` denying camera, microphone and geolocation.
    - **Why `'unsafe-inline'` scripts:** Next's RSC payload and `next-themes` are inline scripts. Nonces would force every statically generated page to render dynamically, and that's rejected for a brochure site.
    - **Preview deploys only** (`VERCEL_ENV=preview` at build) add `https://vercel.live` to `script-src`, `connect-src` and `frame-src`, so Vercel's preview toolbar keeps working.
    - *Rejected:* `Content-Security-Policy-Report-Only` first, because nothing collects the reports.
18. **CSP and runtime breakage are tested, not assumed.** Slice 5 adds a non-screenshot spec that visits every page, opens the mobile menu, and fails on any `securitypolicyviolation` event or console error. Adding specs is allowed after slice 1; changing baselines or fixtures is not. Unit tests for `safeUrl.ts` use Node's built-in runner (`node --test`; Node 24 strips TypeScript types natively), so no new dependency. That's `npm run test:unit`, and it joins the gate.
19. **Unknown section slugs become a static 404.** `export const dynamicParams = false` in `src/app/sections/[slug]/page.tsx` stops any runtime filesystem read from `params.slug` (F7). `resolveSectionImages` looks up `imageId` with `Object.hasOwn`, so an `imageId` of `constructor` can't break the build.

## Vertical slices

| # | Slice | Depends on | Touches |
|---|---|---|---|
| 1 | **Visual guarantee.** `CONTENT_DIR` seam, fixture copy, Playwright config and specs, 34 baselines proven stable on the pre-upgrade tree, `test:e2e` / `test:e2e:update` scripts, `test-results/` and `playwright-report/` gitignored | — | `src/lib/articles.ts`, `src/lib/pages.ts`, `playwright.config.ts`, `e2e/**`, `package.json`, `package-lock.json`, `.gitignore` |
| 2 | **Remove TinaCMS and dead dependencies:** Tina packages, `tina/`, `public/tina/.gitignore`, the `tina:*` scripts, `cheerio`, `feed`, `@types/webpack-env`, the dead RSS link, README mentions of Tina and RSS. Harness files that mention Tina are updated too (`.claude/agents/website-engineer.md`, `AGENTS.md`, `grimoire.config.json`). | 1 | `package.json`, lockfile, `tina/**`, `public/tina/.gitignore`, `src/app/layout.tsx`, `README.md`, harness files |
| 3 | **In-range updates:** everything that moves without a major (Tailwind 4.3, typography, Headless UI 2.2, Prettier, `prettier-plugin-tailwindcss`, in-range `@types/*`, Next 14.2.35), then `npm audit fix` (never `--force`) | 2 | `package.json`, lockfile, any file Prettier 3.9 reformats |
| 4 | **Next 16 + React 19:** `next`, `eslint-config-next`, `react`/`react-dom`, React 19 types, TypeScript 6.0.3, ESLint 9 flat config, `next-themes` 0.4.6, `@types/node` 24, `engines.node`, drop `sharp`. Code changes: async `params` (`src/app/sections/[slug]/page.tsx`), `useRef` needing an argument (`src/app/providers.tsx:9`), `head.tsx` (decision 14), `experimental.outputFileTracingIncludes` moving to the top level (`next.config.mjs`). README stack and Node version updated. | 3 | `package.json`, lockfile, `next.config.mjs`, `eslint.config.mjs`, `.eslintrc.json`, `tsconfig.json`, `src/app/**`, `README.md` |
| 5 | **Security hardening and a clean audit:** `safeUrl.ts` with unit tests, wired into the contact form, the Maps iframe and every frontmatter `href` (decision 16); headers and CSP (decision 17); the CSP/console spec (decision 18); `dynamicParams = false` and `Object.hasOwn` (decision 19); drop the unused `images.remotePatterns` entry for Unsplash (F6); `test:unit` script. Then `npm audit` at zero, or each residual justified in the PR. | 4 | `src/lib/safeUrl.ts` (+ test), `src/app/contact/{page,ContactForm}.tsx`, `src/app/page.tsx`, `src/app/sections/[slug]/page.tsx`, `src/lib/sectionImages.ts`, `next.config.mjs`, `e2e/runtime.spec.ts`, `package.json` |

The order is a default: slices 2 and 3 both touch `package.json` and the lockfile, so they serialize anyway.

## Edge cases and failure modes

- **Flaky baselines.** Three consecutive green runs before commit. Masks plus offline routing remove the known non-determinism: the Maps iframe, the year, photo encoding and lazy loading.
- **The association pushes content during the run.** The run branch is cut from `origin/main` at the start. Their edits don't touch the fixtures, so the gate is unaffected. They merge into the PR like any other content commit. Content conflicts are impossible, since no slice edits `content/`.
- **Turbopack becomes the default bundler in Next 16 builds.** If a build breaks only under Turbopack, slice 4 may fall back to `next build --webpack`, with the evidence in the PR.
- **TypeScript 6 rejects today's `tsconfig.json`** (`target: es6` and friends). Slice 4 adjusts only what `tsc` reports, nothing speculative.
- **An unavoidable visual diff** from a framework default change goes to the owner as `NEEDS_CONTEXT` with the diff image; it's never re-baselined silently (decision 8).
- **Vercel's runtime vs local.** Vercel's image optimizer isn't local `sharp`. Photos are masked, so this can't fail the gate, but the PR's automatic Vercel preview deployment is the place for a human eyeball before merging.
- **Production rollout and rollback.** Merging the PR deploys to Production. A failed Vercel build leaves the previous deployment live. A bad deploy is rolled back by reverting the merge commit on `main` (Vercel's instant rollback needs access to the Vercel project, which this workspace doesn't have).
- **CSP versus scripts Vercel injects.** Web Analytics and Speed Insights, if they're enabled in the Vercel project (which can't be read from here), load from same-origin `/_vercel/*`, which `'self'` covers. The preview toolbar is handled by decision 17. Anything else the CSP blocks on Vercel shows up as a console error on the PR's preview deployment, so a human checks that preview before merging.
- **Linux or CI later.** The baselines are macOS-only. Adding CI means adding Linux baselines (or a Playwright Docker image). That's out of scope here.

## Security findings (application level)

From `security-scout`, 2026-10-02. Nothing is reachable by an anonymous visitor today: no secrets in the tree or the history, no API routes, the Tina admin isn't deployed (`/tina/index.html` and `/admin` return 404 live), and Markdown rendering is safe (react-markdown with no raw HTML, and its default URL transform blocks `javascript:`). Every code finding needs write access to `content/**/*.md`, and that access is amplified by an unprotected, auto-deploying `main`.

| # | Finding | Evidence | Severity | Handled by |
|---|---|---|---|---|
| F1 | The contact form sends the visitor's name, email, phone and message to whatever `email.href` holds, unchecked; a `javascript:` value runs on submit | `src/app/contact/ContactForm.tsx:41-43`, `contact/page.tsx:43-48,280` | low–medium | decision 16 |
| F2 | `mapEmbedUrl` goes into `<iframe src>` unchecked, with no `referrerPolicy` or `title` | `ContactForm.tsx:48-54`, `contact/page.tsx:85-86` | low–medium | decision 16 |
| F3 | Frontmatter `href`s aren't scheme-checked, so a `javascript:` URL could reach `<a>` / `next/link` | `contact/page.tsx:102,227,241`, `page.tsx:134,146,324,329` | low | decision 16 |
| F4 | No security headers at all; only Vercel's default HSTS | `next.config.mjs`, live response headers | low (hardening) | decision 17 |
| F5 | `main` is unprotected, two accounts have write access, and secret scanning and push protection are off on a public repo | `gh api` branches / rulesets | medium (process) | owner follow-up |
| F6 | `images.remotePatterns` allows `images.unsplash.com` with no image using it, so the optimizer can be used as a proxy | `next.config.mjs:5-10` | low | slice 5 |
| F7 | `params.slug` reaches `path.join` and unknown slugs render at runtime; `imageId` is looked up on a plain object | `src/lib/articles.ts:36,113-121`, `src/lib/sectionImages.ts:48` | hardening | decision 19 |
| F8 | `tina/__generated__/client.ts` is tracked, holds a local absolute path, and would bake in a real `TINA_TOKEN` if one were ever exported | `tina/__generated__/client.ts:3`, `tina/config.ts:12` | info | slice 2 (Tina removed) |

## Questions still owned by the user

- Whether to accept any visual diff an upgrade slice can't remove (asked per case, with the diff image).
- **GitHub settings (F5), which only the owner can change:**
  - Turn on secret scanning and push protection (free on public repos).
  - Require 2FA for both accounts that can write.
  - Possibly protect `main` with a ruleset that still lets the association's account push content.
- **Follow-ups noticed during recon, deliberately not in scope** (each changes visible output or behaviour):
  - `<html lang="en">` on a French site (`src/app/layout.tsx:29`).
  - The title template says "Le Chêne et **ces** racines" (`src/app/layout.tsx:10-11`).
  - react-markdown strips the `tel:` link in `content/sections/parentalite.md:23`.
  - An empty `<form action="/thank-you">` posts to a page that returns 404 (`src/app/page.tsx:123-125`).
  - Commit `66c5337` claims to add `apple-app-site-association.json` but changes no files.

## Sources consulted

- **Docs:** `README.md`, `CHANGELOG.md` (template history), `memory/harness.md`.
- **Code:** `src/app/**`, `src/lib/{articles,pages,sectionImages}.ts`, `src/components/{Header,Footer}.tsx`, `src/app/providers.tsx`, `tina/config.ts`, `next.config.mjs`, `package.json`, `.eslintrc.json`, `prettier.config.js`, `tsconfig.json`.
- **History:** `git log` and the GitHub compare `66c5337...main` (20 content-only commits by the association).
- **Registry, 2026-10-02:** `npm outdated`, `npm audit` (52 advisories), and `npm view` peer and engine ranges of `next@16.3.8`, `eslint-config-next@16.3.8`, `typescript-eslint`, `eslint-plugin-{react,react-hooks,import,jsx-a11y}`, `@tinacms/cli@4`, `tinacms@3.14.2`, `next-themes@0.4.6`, `@headlessui/react@2.2.10`, `react-markdown@10`, and `typescript` dist-tags.
- **Deploy:** GitHub deployments API (28 Production deploys by `vercel[bot]`, no other environment); branch protection (none).
- **Scouts:** `security-scout` (application-level security: code read plus read-only requests to the live site).
- **Vercel docs:** `engines.node` (`"24.x"`) overrides the project's Node setting (vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Self-answered questions

| Question | Answer | Source |
|---|---|---|
| Do screenshots need dark mode? | No; the theme is forced to light | `src/app/providers.tsx:52` |
| Does anything animate on its own? | No; the photo tilts are static classes and transitions are hover-only | `src/app/page.tsx:252`, `src/components/*.tsx` |
| Does the site use Tina at runtime? | No; `src/` has no Tina import | grep over `src/` |
| Can we take TypeScript 7.0.2? | No; `typescript-eslint` peers `<6.1.0`, so 6.0.3 | `npm view typescript-eslint peerDependencies` |
| Can we take ESLint 10? | No; three `eslint-config-next` plugins cap at 9 | `npm view eslint-plugin-{react,import,jsx-a11y} peerDependencies` |
| Keep the explicit `sharp`? | No; Next 16 brings `sharp ^0.35.4` | `npm view next@16.3.8 optionalDependencies` |
| Which Node? | 24.x: Next 16 needs ≥ 20.9, local is 24.14, the Vercel setting can't be read | `npm view next@16.3.8 engines`, `node --version` |
| Is `feed` / RSS used? | No; there's no `feed.xml` route and the `alternates` link 404s | `src/app/layout.tsx:15-19`, route list |
| Which code breaks on React 19 / Next 15+? | Sync `params`, `useRef<T>()` with no argument, the global `JSX` namespace in `head.tsx`, `experimental.outputFileTracingIncludes` | the files listed in slice 4 |
| Chromium only? | Yes; the upgrade changes the framework, not the browser engines | decision 1 |
| Mask or tolerate photos? | Mask them and assert they load | decision 5 |

## Docs drift fixed

| Document | Says | Code does | Fixed in |
|---|---|---|---|
| `README.md` "Méta-données globales" | the root layout "intègre le flux RSS" | `src/app/layout.tsx:17` links to `/feed.xml`, which no route serves | slice 2 (link and claim removed) |
| `README.md` "Pile technique" / "Prise en main" | Next.js 14, React 18, Node 18.17 | will be Next 16, React 19, Node 24 | slice 4 |
| `memory/harness.md` (seeded this session) | work goes to `/orchestrate` as a plan | the loop requires a tracker project | fixed 2026-10-02 (entry replaced by the GitHub Issues fact) |

## Reference projects

None needed. Every pattern here (`toHaveScreenshot` with `mask`, `animations: 'disabled'`, the `webServer` config, platform-suffixed snapshot paths) is Playwright's documented, official API.
