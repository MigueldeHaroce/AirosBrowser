
const searchResults = document.getElementById('searchResults');

ipcRenderer.on('search-results', (event, results) => {
  const html = `<html><body>${results}</body></html>`;
  searchResults.loadURL(`data:text/html,${encodeURIComponent(html)}`);
});
