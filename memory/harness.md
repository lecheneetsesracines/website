<!-- HARNESS MEMORY: declarative facts for every root session. Cap 2200 chars. Entries separated by § . Written only by `crystallize`; see the grimoire plugin's memory/README.md -->
Every push to `main` of lecheneetsesracines/website deploys to Vercel Production: there is no staging environment, no CI workflow, and `main` has no branch protection on GitHub (verified 2026-10-02).
§
The association's GitHub account (LE-CHENE-ET-SES-RACINES) edits `content/pages/*.md` and `content/sections/*.md` directly on `main` through the GitHub web editor, independently of code work, so `origin/main` moves with content-only commits between plan and merge (2026-10-02).
§
The Vercel project for this site is not in the AWESOME LAB Vercel team, so its build settings, env vars and logs are not reachable from this workspace's Vercel connector (checked 2026-10-02).
§
The tracker is GitHub Issues on lecheneetsesracines/website, reached through the authenticated `gh` CLI; the repository is public, so issues and PRs are public (decided 2026-10-02).
§
The whole gate (lint, typecheck, 19 unit tests, build, 74 Playwright tests) runs in under a minute on the maintainer's Mac, 44 s from a fresh clone, so an agent that passes the 40-minute backstop is not waiting on the tests (measured 2026-10-03).
