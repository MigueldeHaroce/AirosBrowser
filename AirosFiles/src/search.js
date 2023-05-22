// Store the search history

const searchHistory = [];

console.log(searchHistory);

let searchResults; // Declare searchResults variable outside the DOMContentLoaded event listener

window.addEventListener("DOMContentLoaded", () => {
  console.log(searchHistory);

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

    if (results) {
      searchResults = results;
      console.log(searchHistory);


      // Add the search result to the search history
      searchHistory.push(results);
      console.log(searchHistory);


    } else {
      console.error('Error: searchResults or results is undefined.');
    }
  });
});

ipcRenderer.on('addHistoryList', (results) => {
  searchHistory.push(results);
  console.log(searchHistory);
});