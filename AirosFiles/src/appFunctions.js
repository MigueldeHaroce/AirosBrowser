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


const button = document.getElementById("passwordLogo");
const popup = document.getElementById("keychain-popup");
const closePopupButton = document.getElementById("closePopup");
const overlay = document.getElementById("overlay");

// Function to open the popup
button.addEventListener("click", function() {
  popup.style.display = "block";
  overlay.style.display = "block";

  // Calculate the position of the popup relative to the button
  const buttonRect = button.getBoundingClientRect();
  const popupRect = popup.getBoundingClientRect();

  const left = buttonRect.left + window.scrollX;
  const top = buttonRect.bottom + window.scrollY;

  // Set the position of the popup
  popup.style.left = left + "px";
  popup.style.top = top + "px";

  // Function to close the popup
  closePopupButton.addEventListener("click", closePopup);
});

// Function to close the popup
function closePopup() {
  popup.style.display = "none";
  overlay.style.display = "none";
}

// Make the popup draggable
let isDragging = false;
let offsetX, offsetY;

popup.addEventListener("mousedown", function(event) {
  isDragging = true;
  offsetX = event.clientX - parseFloat(window.getComputedStyle(popup).left);
  offsetY = event.clientY - parseFloat(window.getComputedStyle(popup).top);
});

document.addEventListener("mousemove", function(event) {
  if (isDragging) {
    popup.style.left = event.clientX - offsetX + "px";
    popup.style.top = event.clientY - offsetY + "px";
  }
});

document.addEventListener("mouseup", function() {
  isDragging = false;
});

// get the input field and search button elements
// get the input field and search button elements



// ------------- Keychain Popup -------------

const passwordForm = document.getElementById("password-form");
const saveBtn = document.getElementById("save-btn");
const viewPasswordsBtn = document.getElementById("view-passwords-btn");
const passwordList = document.getElementById("password-list");
const passwordListUl = document.querySelector("#password-list ul");

let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userID = document.getElementById("user-id").value;
  const password = document.getElementById("password").value;
  passwords.push({ userID, password });
  savePasswords();
  displayPasswords();
  passwordForm.reset();
});

viewPasswordsBtn.addEventListener("click", () => {
  passwordList.style.display = passwordList.style.display === "none" ? "block" : "none";
});

function savePasswords() {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}

function displayPasswords() {
  passwordListUl.innerHTML = "";
  passwords.forEach((password, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${password.userID}</span>
                    <button class="delete-btn" data-index="${index}">Delete</button>`;
    passwordListUl.appendChild(li);
  });
  if (passwords.length === 0) {
    passwordList.style.display = "none";
  }
}

passwordList.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    const index = e.target.getAttribute("data-index");
    passwords.splice(index, 1);
    savePasswords();
    displayPasswords();
  }
});