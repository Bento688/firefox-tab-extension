import { defineWebExtConfig } from 'wxt';

export default defineWebExtConfig({
  firefoxPref: {
    'intl.locale.requested': 'en-US',
  },
  firefoxProfile: "main-duplicate"
});
