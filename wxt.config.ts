import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  manifest: {
    name: 'Tab Search',
    description: 'Search and manage browser tabs',
    permissions: ['tabs'],
    commands: {
      'toggle-tab-search': {
        suggested_key: {
          default: 'Ctrl+Space',
          mac: 'MacCtrl + Space'
        },
        description: 'Toggle Tab Search',
      },
    },
  },
  srcDir: 'src',
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
