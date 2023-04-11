const closeBtn = document.getElementById("closeBtn");
const minimizeBtn = document.getElementById("minimizeBtn");
const restoreBtn = document.getElementById("restoreBtn");


closeBtn.addEventListener("click", close_app);
minimizeBtn.addEventListener("click", minimize_app);
restoreBtn.addEventListener("click", restore_app);


function close_app() {
  app.window.close();
}

function minimize_app() {
  app.window.minimize();
}

function restore_app() {
  app.window.restore();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const textInput = document.getElementById('text-input');

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }  
  if (textInput) {
    textInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = textInput.value;
    if (query) {
      window.location.href = `searchPage.html?q=${encodeURIComponent(query)}`;
    }
  }
  // Check if the searchResults WebView element exists
  const searchResults = document.getElementById('searchResults');
  if (searchResults) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      searchResults.src = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else {
      // Redirect back to the search menu if no query is provided
      searchResults.src = 'searchMenu.html';
    }
  }
});

