// listener for the main keyboard shortcut.

export default defineBackground(() => {
  // executed when background is loaded
  browser.commands.onCommand.addListener((command, tab) => {
    if (command === "toggle-tab-search") {
      console.log("Hello, from tab search")
    }
  })
});

