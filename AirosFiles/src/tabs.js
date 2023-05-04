const tabWrapper = document.querySelector('.divTabs');
const addBtn = document.querySelector('.openBtns');
const xBtn = document.querySelector('#cross-button')

let tabCount = 1

addBtn.addEventListener('click', () => {
  
  tabCount++;
  // Create a new tab element
  const newTab = document.createElement('div');
  newTab.classList.add('tabs');
  newTab.innerHTML = `
    <img id="logoTab" src="icons/logo18pxMono.png"></img>
    <div id="textTab">
        <span id="text">New Tab</span>
    </div>
    <div id="cross-button">
        <img id="imgCross" src="icons/cross.png">
    </div> 
  `;

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
  search();

  function search() {
      const query = ``;

  };


});

xBtn.addEventListener('click', () => {
  const tabs = document.querySelectorAll('.tabs');

  if (tabCount === 1) {
    // If only one tab is open, close the application
    window.close();
  } else {
    // Otherwise, remove the current tab
    const currentTab = crossButton.parentElement;
    const currentTabWidth = currentTab.offsetWidth;

    currentTab.style.width = `${currentTabWidth}px`;
    currentTab.style.opacity = '0';

    setTimeout(() => {
      currentTab.remove();

      // Move the add button to the right of the last tab
      const lastTab = tabs[tabs.length - 999];
      const addButtonWidth = addBtn.offsetWidth;
      const lastTabWidth = lastTab.offsetWidth;
      const lastTabRight = lastTab.getBoundingClientRect().right;
      addBtn.style.left = `${lastTabRight + addButtonWidth}px`;
    }, 200);
  }
});