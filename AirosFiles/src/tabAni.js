const animateButton = document.getElementById('animate-button');
const box = document.getElementById('box');

animateButton.addEventListener('click', () => {
  box.classList.add('rectangle');
});
