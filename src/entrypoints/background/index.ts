// listener for the main keyboard shortcut.
import { browser } from "wxt/browser";

import constants from "../../lib/constants.ts"

export default defineBackground(() => {
  // executed when background is loaded
  browser.commands.onCommand.addListener((command, tab) => {
    if (command === "toggle-tab-search") {
      if (!tab?.id) return;
      browser.tabs.sendMessage(
        tab.id,
        {
          action: constants.TOGGLE_EVENT,
          payload: {
            message: "open"
          }
        }
      )
    }
  })
});

