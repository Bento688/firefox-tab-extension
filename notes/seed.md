
# FIREFOX EXTENSION

- a firefox extension that searches and manages your tabs. something like my own version of the "tabsearch" extension.
    - and sort of the "T" command in the 'Vimium' extension

## FEATURES/QUESTIONS/CURIOSITIES THAT I NEED TO IMPLEMENT (CHECKPOINTS)

- [done] display all of the available tabs in a list.

- [implemented the simplest version] make the listItem react and focuses to that tab when I click it.

- [implemented the dark theme] need to style the list
    - for each of the listitem, make it prettier.
    - show details like:
        - favIcon
        - title

- need to make it as an overlay instead of a toolbar app.

Migration Plan
1. Add WXT, React, and TypeScript tooling.
2. Move manifest metadata, permissions, and shortcut definitions into wxt.config.ts.
3. Create entrypoints/background.ts to:
- Handle toggle-tab-search.
- Send toggle messages to the active tab.
- Serve tab-query and tab-activation requests.
4. Create entrypoints/tab-search.content/ with:
- A React root mounted through createShadowRootUi.
- cssInjectionMode: "ui" for isolated styles.
- Search filtering, arrow-key navigation, Enter selection, and Escape dismissal.
5. Remove the popup once the overlay reproduces its existing functionality.
6. Update AGENTS.md because the project will no longer load directly from the repository root.
7. Verify with:
- npm run dev:firefox
- npm run build:firefox
- Manual shortcut and tab-switching checks.
