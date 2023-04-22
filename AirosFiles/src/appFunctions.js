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

  textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      search();
    }
  });

  searchBtn.addEventListener('click', () => {
    search();
  });

  function search() {
    const searchText = textInput.value;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;

    const webview = document.getElementById('searchResults')
    if (webview) {
      webview.addEventListener('did-finish-load', () => {
        // Modify the URL of the webview here
        webview.src(searchUrl)
      })
    } else {
      console.error("not found webview")
    }
  }
});


// get the input field and search button elements
// get the input field and search button elements



