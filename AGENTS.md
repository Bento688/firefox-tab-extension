# Repository Guide

## Product

- A keyboard-first tab switcher that also works with the mouse: search open tabs and jump to one. Inspired by the "Tab Search" extension, Vimium's `T` command, the AltTab macOS app, and Neovim Telescope.
- Planned: fuzzy search, arrow-key navigation, Enter to switch, Escape to close, and custom keyboard shortcuts. Firefox first, Chrome later.
- Publishing to the Firefox Add-ons store is a possible goal, so keep permissions small.

## Runtime Shape

- This is a WXT, React, and TypeScript Firefox Manifest V3 extension. `wxt.config.ts` and source files under `src/` (`srcDir: 'src'`) generate the extension in `.output/firefox-mv3/`.
- `src/entrypoints/tab-search.content/index.tsx` is the active UI entrypoint. It mounts React in WXT's Shadow DOM and must keep `cssInjectionMode: 'ui'` so extension styles do not leak into webpages.
- `src/entrypoints/background/index.ts` listens for the `toggle-tab-search` command. The background file must be `.ts` or `.js`: WXT treats `background/index.tsx` as an unlisted script and leaves it out of the manifest.
- `popup/` is the old pre-WXT popup (lists tabs, switches on click), kept as a reference. WXT does not include it in its build. Put manifest changes in `wxt.config.ts` or entrypoint options.

## Commands And Checks

- Use npm; `package-lock.json` is authoritative. `npm ci` runs `wxt prepare` through `postinstall`.
- Run `npm run compile` for TypeScript and `npm run build:firefox` for the production Firefox MV3 build. There is no test runner, linter, formatter, or CI workflow.
- Use `npm run dev:firefox` for a temporary Firefox profile with the extension loaded. WXT defaults Firefox to MV2, so keep the explicit `--mv3` flags in package scripts.
- Inspect the generated manifest at `.output/firefox-mv3/manifest.json`; there is no hand-written manifest.

## UI Tooling

- Tailwind CSS v4 is configured through `@tailwindcss/vite` in `wxt.config.ts`; do not add a separate `vite.config.ts` or a Tailwind config file.
- `src/assets/tailwind.css` contains the shadcn zinc theme. Theme variables use `:host`, and the content entrypoint adds the `dark` class to the Shadow DOM host.
- WXT's PostCSS `rem` conversion prevents host pages from changing Tailwind/shadcn sizing through their root font size.
- Shadcn uses package import aliases from `package.json`. Keep `components.json` aliases as `#components`, `#lib`, and `#hooks`; using WXT's generated `@` alias makes the shadcn CLI write outside this repository.
- Add shadcn components with `npx shadcn@latest add <component>`. Components that use portals must target the Shadow DOM instead of the webpage's `document.body`.

## Migration Status

Moving from the old toolbar popup to an overlay drawn on the page.

The old popup already does these, and the overlay doesn't yet: list all tabs, switch to a tab on click (simplest version), dark-theme list items with favicon and title.

1. [done] Add WXT, React, and TypeScript tooling.
2. [done] Move manifest metadata, permissions, and shortcut definitions into `wxt.config.ts`.
3. [in progress] `src/entrypoints/background/index.ts`:
   - [done] Handle `toggle-tab-search`.
   - Send toggle messages to the active tab.
   - Serve tab-query and tab-activation requests.
4. [in progress] `src/entrypoints/tab-search.content/`:
   - [done] React root mounted through `createShadowRootUi`.
   - [done] `cssInjectionMode: 'ui'` for isolated styles.
   - Search filtering, arrow-key navigation, Enter selection, and Escape dismissal.
5. Remove `popup/` once the overlay does everything the popup does.
6. [done] Update this file now that the extension no longer loads from the repository root.
7. Verify with `npm run dev:firefox`, `npm run build:firefox`, and manual shortcut and tab-switching checks.
