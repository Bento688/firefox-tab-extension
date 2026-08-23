async function main() {

  // get the tabs
  const tabs = await browser.tabs.query({
    currentWindow: true
  });

  console.log(tabs);

  const tabsList = document.getElementById("tabs")

  for (const tab of tabs) {
    const listItem = document.createElement("li");

    listItem.textContent = tab.title;
    listItem.id = tab.id;

    tabsList.appendChild(listItem);
  }

}

main();

