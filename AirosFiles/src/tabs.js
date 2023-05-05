const addBtn = document.querySelector('.openBtns');

const tabs = document.querySelector('.divTabs');
tabs.style.flexGrow = 1;

const webviewsWrapper = document.querySelector('.webviews');
webviewsWrapper.style.height = '100%';

if (addBtn) {
  addBtn.addEventListener('click', () => {
    // Create a new tab element
    const newTab = document.createElement('div');
    newTab.classList.add('tabs');
    // ...
    
    // Insert the new tab 
    tabs.appendChild(newTab);

    const newWebview = document.createElement('webview');
    newWebview.classList.add('searchResults');
    newWebview.src = 'https://www.google.com';
    webviewsWrapper.appendChild(newWebview);

    // Switch to the new tab
    newTab.style.flexGrow = 1;
    tabs.querySelectorAll('.tabs').forEach(t => t.style.flexGrow = 0);

    // Show the new webview
    newWebview.style.flexGrow = 1;
    webviewsWrapper.querySelectorAll('.searchResults').forEach(w => w.style.flexGrow = 0);
  }); 
}

tabWrapper.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.classList.contains('imgCross')) { 
    // ... Animate and remove tab
  }
});

tabWrapper.addEventListener('click', (event) => {
  const targetTab = event.target.closest('.tabs');
  if (targetTab && targetTab !== addBtn) {
    // Switch to the selected tab
    targetTab.style.flexGrow = 1;
    tabs.querySelectorAll('.tabs').forEach(t => t.style.flexGrow = 0);

    // Show the corresponding webview
    const index = Array.from(tabs).indexOf(targetTab);
    const webviews = document.querySelectorAll('.searchResults');
    const webview = webviews[index];
    webview.style.flexGrow = 1;
    webviewsWrapper.querySelectorAll('.searchResults').forEach(w => w.style.flexGrow = 0);
  }
});