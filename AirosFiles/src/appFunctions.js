const closeBtn = document.getElementById("closeBtn");
const minimizeBtn = document.getElementById("minimizeBtn");
const restoreBtn = document.getElementById("restoreBtn");

closeBtn.addEventListener("click", close_app);
minimizeBtn.addEventListener("click", minimize_app);
restoreBtn.addEventListener("click", restore_app);

button1.addEventListener("click", next_page)

function close_app() {
  app.window.close();
}

function minimize_app() {
  app.window.minimize();
}

function restore_app() {
  app.window.restore();
}

function fade_out() {
  const body = document.getElementsByTagName("body")[0];
  body.style.opacity = "0";
}

function next_page(){
  const body = document.getElementsByTagName("body")[0];

  fade_out();
  setTimeout(() => {
    app.window.pass();
    body.style.opacity = 1;
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
