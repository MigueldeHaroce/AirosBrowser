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
    } else {
      console.error('Error: searchResults or results is undefined.');
    }
  });
});

