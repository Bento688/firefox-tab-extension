async function main() {

  // get the tabs
  const tabs = await browser.tabs.query({
    currentWindow: true
  });

  console.log(tabs);

  const tabsList = document.getElementById("tabs")

  for (const tab of tabs) {
    const listItem = document.createElement("li");
    const favIcon = document.createElement("img");
    const title = document.createElement("span");

    if (tab.favIconUrl) {
      favIcon.src = tab.favIconUrl;
    }    
    favIcon.width = 16;
    favIcon.height = 16;

    title.textContent = tab.title;

    listItem.appendChild(favIcon);
    listItem.appendChild(title);

    listItem.id = tab.id;

    listItem.addEventListener("click", async () => {
      await browser.tabs.update(tab.id, {
        active: true
      });

      await browser.windows.update(tab.windowId, {
        focused: true
      });
    });

    tabsList.appendChild(listItem);
  }
}

main();

