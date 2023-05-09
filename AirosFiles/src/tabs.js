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
    
    const newWebview = document.createElement('webview');
    newWebview.classList.add('searchResults');
    newWebview.src = 'https://www.google.com';
    newWebview.addEventListener('load', () => {
      const iframe = newWebview.querySelector('iframe');
      iframe.style.height = '100%';
    });
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

    activeWebview = newWebview;

  });
}

tabWrapper.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.classList.contains('imgCross')) {
    const tab = target.closest('.tabs');
    const tabWidth = tab.offsetWidth;
    tab.style.width = `${tabWidth}px`;
    // Animate the tab closing
    tab.classList.add('tabs-close-animation');
    tab.querySelector('.cross-button').classList.add('cross-button-close-animation');
    tab.querySelector('#logoTab').classList.add('logoTab-close-animation');

    // Remove the tab after the closing animation ends
    tab.addEventListener('animationend', () => {
      tabWrapper.removeChild(tab);

      // Move the add button back to its original position
      const finalTabWidth = tabWidth + addBtn.offsetWidth - 5;
      const addButtonLeft = addBtn.getBoundingClientRect().left;
      addBtn.style.left = `${addButtonLeft - finalTabWidth}px`;

      // Update the number of tabs
      numTabs--;

      // Close the app if there's only one tab left
      if (numTabs === 1) {
        window.close();
      }
    });

  }
});

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