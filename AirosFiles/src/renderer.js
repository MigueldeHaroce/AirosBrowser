// In your renderer process

// Get the placeholder element
const searchResults = document.querySelector('#searchResults');

// Pull your search
ipcRenderer.send('pull-search', searchID);

// Wait for a response
ipcRenderer.on('search-results', (event, results) => {
  if (searchResults && results) {
    // Set the source of the placeholder element to the search results URL
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});
