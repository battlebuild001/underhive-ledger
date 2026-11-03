# Repository workflow

- Canonical development repository: https://github.com/battlebuild001/underhive-ledger
- `origin` is GitHub; `sites` is the existing ChatGPT Sites deployment mirror.
- Start new work from the latest `origin/main`, preserving any existing local changes. `main` tracks `origin/main`.
- Commit and push completed source changes to GitHub first.
- For app releases, build and validate with `npm run build` and `npm run validate`, then push the same exact commit to the Sites source repository with its short-lived native credential before saving/deploying that version.
- Keep `.openai/hosting.json` project identity and the existing D1/R2 bindings. App URL: https://underhive-ledger-2026.hebi-cogitox.chatgpt.site
- Documentation-only changes do not require a runtime deployment.
- Client source is `dist/`; generated deployment output is `.sites-build/` and is not committed.
