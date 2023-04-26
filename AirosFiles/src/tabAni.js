
let button = document.getElementById('my-button');

button.addEventListener('click', () => {
  ipcRenderer.send('start-animation');
});

ipcRenderer.on('start-animation', () => {
  animationWindow.show();
});
