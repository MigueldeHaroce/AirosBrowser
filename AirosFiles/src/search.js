
const searchResults = document.getElementById('searchResults');

ipcRenderer.on('search-results', (event, results) => {
    searchResults.src = `data:text/html,${encodeURIComponent(results)}`;
});
