import ReactDOM from 'react-dom/client';

import { Command, CommandInput } from '#components/ui/command';

import '../../assets/tailwind.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'tab-search',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container, shadow) => {
        shadow.host.classList.add('dark');

        const app = document.createElement('div');
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(
          <Command className="hidden">
            <CommandInput placeholder="Search tabs..." />
          </Command>,
        );
        return root;
      },
      onRemove: (root) => root?.unmount(),
    });

    ui.mount();
  },
});
