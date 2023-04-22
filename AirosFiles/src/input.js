const { remote } = require('electron');
const searchResults = remote.getCurrentWindow().webContents;

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
  const query = textInput.value;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  searchResults.executeJavaScript(`document.querySelector('#searchResults').src = '${url}'`);
}