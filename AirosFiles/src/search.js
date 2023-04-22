const searchResults = document.querySelector('#searchResults');
console.log('searchResults:', searchResults);

ipcRenderer.on('search-results', (event, results) => {
  console.log('Received search-results event with data:', results);
  if (searchResults && results) {
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});