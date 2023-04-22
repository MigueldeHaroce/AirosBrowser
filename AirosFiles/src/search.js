
const searchResults = document.getElementById('searchResults');

ipcRenderer.on('search-results', (event, results) => {
  searchResults.loadURL(`data:text/html,${encodeURIComponent(html)}`);
});
