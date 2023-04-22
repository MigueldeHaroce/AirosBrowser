const searchResults = document.querySelector('#searchResults');

ipcRenderer.on('search-results', (event, results) => {
  if (searchResults && results) {
    searchResults.innerHTML = `<iframe src="${results}"></iframe>`;
  } else {
    console.error('Error: searchResults or results is undefined.');
  }
});
