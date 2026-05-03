# Nishanth Gobi

Welcome to my digital garden.

This site is a mixtape of my original works, Zettlekasten, projects & more. It’s roughly my thinking environment. But I’m sharing them publicly as an experiment. Stick around and eventually it all might just make sense!

## About

A fork of [Quartz v4](https://github.com/jackyzha0/quartz) that publishes my Obsidian vault as a static site at `garden.nishanthgobi.com`. The vault lives in a separate repo (`Nishanth-Gobi/Obsidian-Vault`) and is mounted here as a git submodule under `content/`. This repo holds the framework, theme, and config; the other repo holds the writing.

## Repository layout

- `quartz/` — Quartz framework code. Tracks upstream; touch sparingly.
- `quartz.config.ts` — site config: colors, fonts, plugins, ignored paths, base URL.
- `quartz.layout.ts` — composition: header, sidebars, before/after the body.
- `quartz/styles/custom.scss` — custom CSS. Don't edit `base.scss`.
- `quartz/util/theme.ts` — patched locally to support variable-font axes (see "Customization").
- `quartz/plugins/filters/specials.ts` — filter that hides pages with `draft: true` or `private: true` frontmatter.
- `quartz/static/icon.png` — favicon source. Resized to 48×48 at build.
- `content/` — submodule pointing to the Obsidian vault (`public` branch).
- `.github/workflows/` — `deploy.yml` (push → prod), `update.yml` (pull latest content), `ci.yaml` (build check).

## Getting started

```bash
npx quartz build --serve   # builds + serves on localhost:8080
npx quartz build           # static build only — catches prod-only errors
```

The submodule must be populated or pages won't render. See next section.

## Content submodule

The submodule URL in `.gitmodules` uses the `github.com` host so CI can clone it. On a machine where the SSH key for `github.com` isn't available (e.g. only the `github-personal` alias is set up), the standard init fails. Workaround — set a local URL override that doesn't touch `.gitmodules`:

```bash
git config submodule.content.url git@github-personal:Nishanth-Gobi/Obsidian-Vault.git
git submodule sync content
git submodule update --init content
```

Pull the latest content:

```bash
git submodule update --remote --rebase content
```

Or trigger the workflow remotely: `gh workflow run update.yml`.

### Excluding content from publish

Two independent mechanisms:

1. **Whole folders** → add to `ignorePatterns` in `quartz.config.ts`. Currently: `["private", "templates", ".obsidian"]`.
2. **Individual pages** → set `draft: true` or `private: true` in the page's frontmatter. The `RemoveSpecials` filter (`quartz/plugins/filters/specials.ts`) drops them at publish time.

## Upstream sync

The local `v4` branch is a pristine mirror of `upstream/v4`. Customizations live on `main`. To pull upstream improvements, refresh the mirror then merge it into `main`.

One-time setup:

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git
```

Refresh sequence:

```bash
git fetch upstream
git checkout v4
git reset --hard upstream/v4
git push --force-with-lease origin v4   # v4 is a mirror — force-push is the operation

git checkout main
git merge v4
# resolve conflicts — should be minimal if customization rules below are followed
npm install
npx quartz build --serve   # smoke-test
git push origin main
```

The repo ruleset blocks force-push to `main`, but allows it on `v4` by design.

## Customization

Rules to keep upstream merges clean.

**Edit freely** — Quartz expects users to edit these:

- `quartz.config.ts`
- `quartz.layout.ts`
- `quartz/styles/custom.scss`
- `content/` (submodule)

**Don't touch** — upstream owns these:

- `quartz/styles/base.scss`
- existing files under `quartz/components/`
- existing files under `quartz/plugins/` (the custom `specials.ts` is grandfathered)

**Add freely** — new files don't conflict:

- New components under `quartz/components/`
- New plugins under `quartz/plugins/transformers|emitters|filters/`
- New SCSS partials imported into `custom.scss`

**Documented exceptions** — places where the "don't touch" rule was broken:

- `quartz/util/theme.ts` — extended `FontSpecification` with `axes?: Record<string, string>` so typography config can request variable-font axes (Fraunces' `SOFT` and `opsz`). Worth upstreaming as a PR.
- `quartz/plugins/filters/specials.ts` — custom filter for private/draft frontmatter. Replaces upstream's `RemoveDrafts`.

## Deployment

Push to `main` → GitHub Action `deploy.yml` builds and publishes to GitHub Pages. CNAME at `quartz/static/CNAME` maps the apex domain. Watch a run with `gh run watch`.

## Reference

| Task | Where |
|---|---|
| Local preview | `npx quartz build --serve` |
| Smoke-test prod build | `npx quartz build` |
| Pull latest writing from vault | `git submodule update --remote --rebase content` |
| Pull upstream Quartz fixes | See "Upstream sync" |
| Tweak a style | `quartz/styles/custom.scss` |
| Change colors | `quartz.config.ts` → `theme.colors` |
| Change page layout | `quartz.layout.ts` |
| Hide a whole folder | `ignorePatterns` in `quartz.config.ts` |
| Hide one page | Frontmatter: `private: true` or `draft: true` |
| Replace favicon | Replace `quartz/static/icon.png`, rebuild, hard-refresh browser |
| Browser tab title | Page's frontmatter `title` (Head.tsx). `cfg.pageTitle` controls in-page header + RSS. |
