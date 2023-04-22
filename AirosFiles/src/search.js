const searchResults = document.querySelector('#searchResults');

ipcRenderer.on('search-results', (event, results) => {
  if (searchResults && results) {
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});