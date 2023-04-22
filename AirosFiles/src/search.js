
const searchResults = document.getElementById('searchResults');

ipcRenderer.on('search-results', (event, results) => {
    searchResults.loadURL(results);
});
