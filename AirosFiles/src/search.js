
// Store the search history
const searchHistory = [];

window.addEventListener("DOMContentLoaded", () => {
  // Get searchID from URL
  const searchID = new URLSearchParams(window.location.search).get("searchID");
  console.log(searchID)
  if (!searchID) return;

  const searchResults = document.querySelector('#searchResults');
  console.log(searchResults)
  // Pull your search
  ipcRenderer.send('pull-search', searchID);
  // Wait for a response
  ipcRenderer.on('search-results', (results) => { // no event here, only results

    console.log(results)

    if (searchResults && results) {
      searchResults.src = results;

      // Add the search result to the search history
      searchHistory.push(results);

    } else {
      console.error('Error: searchResults or results is undefined.');
    }
  });
});

ipcRenderer.on('clickedBack', () => {

  console.log('bruh');
  // Check if there is a search history
  if (searchHistory.length > 1) {
    // Remove the current search result from the history
    searchHistory.pop();

    
    // Get the previous search result
    const previousResult = searchHistory[searchHistory.length - 1];

    console.log('prev: ' + previousResult);
    console.log('prevList: ' + searchHistory);

    // Update the webview source with the previous search result
    searchResults.src = previousResult;
  }
});

