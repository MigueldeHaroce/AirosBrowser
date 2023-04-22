const searchResults = document.querySelector('#searchResults');
console.error('searchResults:', searchResults);

window.ipcRenderer.on('search-results', (event, results) => {
  console.error('Received search-results event with data:', results);
  if (searchResults && results) {
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});