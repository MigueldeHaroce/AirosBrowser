const tabWrapper = document.querySelector('.divTabs');
const addBtn = document.querySelector('.openBtns');

if (addBtn) {
  console.log('works');
}

addBtn.addEventListener('click', () => {
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
  if (tabs.length > 0) {
    tabWrapper.insertBefore(newTab, tabs[tabs.length - 1].nextSibling);
  } else {
    tabWrapper.appendChild(newTab);
  }

  // Animate the new tab
  const tabWidth = newTab.offsetWidth;
  newTab.style.width = '0px';
  newTab.style.opacity = '0';
  newTab.style.display = 'flex';
  setTimeout(() => {
    newTab.style.width = `${tabWidth}px`;
    newTab.style.opacity = '1';
  }, 0);

  // Move the add button after the new tab
  const addButtonWidth = addBtn.offsetWidth;
  const addButtonLeft = addBtn.getBoundingClientRect().left;
  addBtn.style.left = `${addButtonLeft + tabWidth + addButtonWidth}px`;
});
