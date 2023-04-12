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

// get the input field and search button elements
// get the input field and search button elements
const searchInput = document.getElementById("text-input");
const searchBtn = document.getElementById("searchBtn");

// add event listeners for the enter key and search button click
searchInput.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    search();
  }
});

searchBtn.addEventListener("click", function (event) {
  search();
});

// define the search function
function search() {
  const query = searchInput.value;
  const searchUrl = `https://www.google.com/search?q=${query}`;

  // navigate to the search page and pass the search URL as a parameter
  window.location.href = `searchPage.html?searchUrl=${encodeURIComponent(
    searchUrl
  )}`;
}
