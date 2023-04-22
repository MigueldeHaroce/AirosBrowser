const searchResults = document.querySelector('#searchResults');
console.error('searchResults:', searchResults);

ipcRenderer.on('search-results', (event, results) => {
  console.error('Received search-results event with data:', results);
  if (searchResults && results) {
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});

// Get searchID from URL
const searchID = new URLSearchParams(window.location.search).get("searchID");

// Pull search results using searchID
if (searchID) {
  ipcRenderer.send('pull-search', searchID);
}

// Set up listener for search-results event
ipcRenderer.on('search-results', (event, results) => {
  console.error('Received search-results event with data:', results);
  if (searchResults && results) {
    searchResults.src = results;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});