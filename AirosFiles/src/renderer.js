const { ipcRenderer } = require('electron');

const searchBtn = document.getElementById('searchBtn');
const textInput = document.getElementById('text-input');

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    search();
  }
});

searchBtn.addEventListener('click', () => {
  search();
});

function search() {
  const searchText = textInput.value;
  if (searchText) {
    ipcRenderer.invoke('search-text', searchText);
  }
}
