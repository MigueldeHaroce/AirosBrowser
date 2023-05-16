// Store the search history
const searchHistory = [];

let searchResults; // Declare searchResults variable outside the DOMContentLoaded event listener

window.addEventListener("DOMContentLoaded", () => {
  // Get searchID from URL
  const searchID = new URLSearchParams(window.location.search).get("searchID");
  console.log(searchID)
  if (!searchID) return;

  searchResults = document.querySelector('#searchResults'); // Assign value to searchResults variable
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

const leftLogo = document.getElementById('leftLogo');
leftLogo.addEventListener('click', () => {
  console.log('bruh');
  // Check if there is a search history
  if (searchHistory) {
    // Remove the current search result from the history
    searchHistory.pop();
    
    // Get the previous search result
    const previousResult = searchHistory[searchHistory.length - 1];

    // Update the webview source with the previous search result
    searchResults.src = previousResult;
  }
});
