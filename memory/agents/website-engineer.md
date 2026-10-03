<!-- AGENT MEMORY for website-engineer: facts that apply to every dispatch. Cap 1200 chars. Entries separated by § . Written only by `crystallize`; see the grimoire plugin's memory/README.md -->
The frontmatter of `content/**/*.md` is edited by non-developers on `main` through the GitHub web editor, so code that reads it must still render every existing content file when a field is renamed, reshaped or missing (2026-10-02).
§
A merge to `main` goes to production with no staging step (2026-10-02).
§
When port 3100 is taken, run the e2e suite with `E2E_PORT=<free port>`; never kill a server you did not start (2026-10-03).
