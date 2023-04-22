
const searchResults = document.querySelector('searchResults');

ipcRenderer.on('search-results', (event, results) => {
    searchResults.src = results;
});
