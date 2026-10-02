<!-- AGENT MEMORY for reviewer: facts that apply to every dispatch. Cap 1200 chars. Entries separated by § . Written only by `crystallize`; see the grimoire plugin's memory/README.md -->
A merge to `main` goes to production on Vercel with no staging step and no CI, so the review and the build gate are the only checks before users see a change (2026-10-02).
§
The frontmatter of `content/**/*.md` is edited by non-developers on `main` through the GitHub web editor; a diff that changes how frontmatter is read must still render every existing content file (2026-10-02).
