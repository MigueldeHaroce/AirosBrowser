const tabWrapper = document.querySelector('.divTabs');
const addBtn = document.querySelector('.openBtns');
let numTabs = 2;

if (addBtn) {
  addBtn.addEventListener('click', () => {
    numTabs++;

    // Create a new tab element
    const newTab = document.createElement('div');
    newTab.classList.add('tabs');
    newTab.innerHTML = `
      <img id="logoTab" src="icons/logo18pxMono.png"></img>
      <div id="textTab">
          <span id="text">New Tab</span>
      </div>
      <div class="cross-button">
          <img id="imgCross" class="imgCross" src="icons/cross.png">
      </div> 
    `;

    // Create a new webview element
    const newWebView = document.createElement('webview');
    newWebView.setAttribute('id', `searchResults${numTabs}`);
    newWebView.setAttribute('src', 'https://www.google.com');

    // Append the new webview element to the tab element
    newTab.appendChild(newWebView);

    // Insert the new tab after the last tab
    const tabs = document.querySelectorAll('.tabs');
    tabWrapper.insertBefore(newTab, tabs[tabs.length - 1].nextSibling);

    // Animate the new tab
    const tabWidth = newTab.offsetWidth;
    newTab.style.width = '0px';
    newTab.style.opacity = '0';
    newTab.style.display = 'flex';
    setTimeout(() => {
      newTab.style.width = `${tabWidth}px`;
      newTab.style.opacity = '1';

      // Move the add button after the new tab
      const addButtonWidth = addBtn.offsetWidth;
      const lastTab = tabs[tabs.length - 999];
      const lastTabRight = lastTab.getBoundingClientRect().right;
      const addButtonLeft = lastTabRight + addButtonWidth;
      addBtn.style.left = `${addButtonLeft}px`;
    }, 0);
  });
}

tabWrapper.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.classList.contains('imgCross')) {
    const tab = target.closest('.tabs');
    const tabWidth = tab.offsetWidth;
    tab.style.width = `${tabWidth}px`;
    tab.style.opacity = '0';

    // Remove the associated webview element
    const webviewId = `searchResults${numTabs}`;
    const webview = document.getElementById(webviewId);
    if (webview) {
      webview.remove();
    }

    setTimeout(() => {
      tab.remove();

      // Move the add button after the last tab
      const addButtonWidth = addBtn.offsetWidth;
      const tabs = document.querySelectorAll('.tabs');
      const lastTab = tabs[tabs.length - 2];
      const lastTabRight = lastTab.getBoundingClientRect().right;
      const addButtonLeft = lastTabRight + addButtonWidth;
      addBtn.style.left = `${addButtonLeft}px`;
    }, 250);
  }
});
