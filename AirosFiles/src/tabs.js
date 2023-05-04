const tabWrapper = document.querySelector('.divTabs');
const addBtn = document.querySelector('.openBtns');
const closeBtns = document.querySelectorAll('#cross-button');

let numTabs = 1;

if (addBtn) {
  addBtn.addEventListener('click', () => {
    // Increment the number of tabs
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
          <img class="imgCross" src="icons/cross.png">
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
      const lastTab = tabs[tabs.length - 2];
      const lastTabRight = lastTab.getBoundingClientRect().right;
      const addButtonLeft = lastTabRight + addButtonWidth;
      addBtn.style.left = `${addButtonLeft}px`;
    }, 0);
  });
}

if (closeBtns) {
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      // Get the tab that contains the close button
      const tab = closeBtn.parentNode.parentNode;

      // If there's only one tab open, close the app
      if (numTabs <= 1) {
        window.close();
      } else {
        // Otherwise, remove the tab
        const tabWidth = tab.offsetWidth;
        tab.style.width = `${tabWidth}px`;
        tab.style.opacity = '0';
        setTimeout(() => {
          tabWrapper.removeChild(tab);

          // Move the add button back to its original position
          const addButtonLeft = addBtn.getBoundingClientRect().left;
          addBtn.style.left = `${addButtonLeft}px`;

          // Update the number of tabs
          numTabs--;
        }, 300);
      }
    });
  });
}
