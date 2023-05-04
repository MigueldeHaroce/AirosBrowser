const tabWrapper = document.querySelector('.divTabs');
const addBtn = document.querySelector('.openBtns');
const webviewsWrapper = document.getElementById('webviews');
let numTabs = 2;
let activeWebview = document.getElementById('searchResults');

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

    // Insert the new tab after the last tab
    const tabs = document.querySelectorAll('.tabs');
    tabWrapper.insertBefore(newTab, tabs[tabs.length - 1].nextSibling);

    // Create a new webview element
    const newWebview = document.createElement('webview');
    newWebview.classList.add('searchResults');
    newWebview.src = 'https://www.google.com';

    // Add the new webview to the webviews wrapper
    webviewsWrapper.appendChild(newWebview);

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

    // Set the active webview to the new webview
    activeWebview = newWebview;
  });
}

tabWrapper.addEventListener('click', (event) => {
  const targetTab = event.target.closest('.tabs');
  if (targetTab && targetTab !== addBtn) {
    // Get the index of the selected tab
    const tabs = document.querySelectorAll('.tabs');
    const index = Array.from(tabs).indexOf(targetTab);

    // Get the corresponding webview
    const webviews = document.querySelectorAll('.searchResults');
    const webview = webviews[index];

    // Switch to the selected webview
    webview.style.display = 'block';
    activeWebview.style.display = 'none';
    activeWebview = webview;
  }
});
