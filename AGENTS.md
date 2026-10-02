# AGENTS.md: the roster

The agents the grimoire orchestrator dispatches in this project. The harness itself (scouts, reviewer, specialists, skills, the build loop) ships in the grimoire plugin; this file lists who is on duty here and how each is configured. Each project agent has a definition in `.claude/agents/<name>.md`; if this file and a definition disagree, the definition wins: fix the drift.

Memory: `memory/harness.md` (shared, imported by `CLAUDE.md`) and `memory/agents/<agent>.md` (one per implementer and the reviewer). Written only by `crystallize`, after a PR. Loop configuration: `grimoire.config.json`.

## Team agents

| Agent | Repo | Default model | Owns | Gate it never runs |
| --- | --- | --- | --- | --- |
| `website-engineer` | `website` (`.`): Next.js 14, React 18, TypeScript 5, Tailwind 4 | sonnet (opus in unattended runs) | `grimoire:tdd`, `frontend-design` | `npm run build` |

## Specialists (enabled in `grimoire.config.json`)

| Agent | Repos | Use here |
| --- | --- | --- |
| `migration-engineer` | `website` | changes to the frontmatter shape of `content/**/*.md` |
| `test-engineer` | `website` | putting untested code under test; the repo has no tests and no test runner yet |

## Scouts in use

| Scout | Use here |
| --- | --- |
| `codebase-scout` | where / how does X work today |
| `security-scout` | the contact form, embedded third-party content, env vars |
| `perf-scout` | image weight, page weight, LCP of the home and section pages |
| `reference-scout` | how credible Next.js projects solve a problem with no precedent here |
| `reviewer` | spec and quality verdict on every diff |
| `tracker-scout` | what a GitHub issue on lecheneetsesracines/website actually requires |

Not used: `contract-checker` (single repo, no shared contract), `design-scout` (no design source).
