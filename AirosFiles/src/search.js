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

window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('textSearch');
  const searchResults = document.querySelector('#searchResults');

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value;
      ipcRenderer.send('search', query);
    }
  });

  // Get searchID from URL
  const searchID = new URLSearchParams(window.location.search).get("searchID");
  if (!searchID) return;

  // Pull your search
  ipcRenderer.send('pull-search', searchID);
  // Wait for a response
  ipcRenderer.on('search-results', (results) => {
    if (searchResults && results) {
      searchResults.src = results;
    } else {
      console.error('Error: searchResults or results is undefined.');
    }
  });
});
