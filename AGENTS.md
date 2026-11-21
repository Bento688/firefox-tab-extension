# Repository Guide

## Runtime Shape

- This is a WXT, React, and TypeScript Firefox Manifest V3 extension. `wxt.config.ts` and files under `entrypoints/` generate the extension in `.output/firefox-mv3/`.
- `entrypoints/tab-search.content/index.tsx` is the active UI entrypoint. It mounts React in WXT's Shadow DOM and must keep `cssInjectionMode: 'ui'` so extension styles do not leak into webpages.
- Root `manifest.json`, `popup/`, and `content/` are legacy migration references; WXT does not include them in its build. Put manifest changes in `wxt.config.ts` or entrypoint options.
- The shortcut is declared, but it still needs a WXT background entrypoint with a `browser.commands.onCommand` listener before it can toggle the overlay.

## Commands And Checks

- Use npm; `package-lock.json` is authoritative. `npm ci` runs `wxt prepare` through `postinstall`.
- Run `npm run compile` for TypeScript and `npm run build:firefox` for the production Firefox MV3 build. There is no test runner, linter, formatter, or CI workflow.
- Use `npm run dev:firefox` for a temporary Firefox profile with the extension loaded. WXT defaults Firefox to MV2, so keep the explicit `--mv3` flags in package scripts.
- Inspect the generated manifest at `.output/firefox-mv3/manifest.json`, not the legacy root manifest.

## UI Tooling

- Tailwind CSS v4 is configured through `@tailwindcss/vite` in `wxt.config.ts`; do not add a separate `vite.config.ts` or a Tailwind config file.
- `assets/tailwind.css` contains the shadcn zinc theme. Theme variables use `:host`, and the content entrypoint adds the `dark` class to the Shadow DOM host.
- WXT's PostCSS `rem` conversion prevents host pages from changing Tailwind/shadcn sizing through their root font size.
- Shadcn uses package import aliases from `package.json`. Keep `components.json` aliases as `#components`, `#lib`, and `#hooks`; using WXT's generated `@` alias makes the shadcn CLI write outside this repository.
- Add shadcn components with `npx shadcn@latest add <component>`. Components that use portals must target the Shadow DOM instead of the webpage's `document.body`.
