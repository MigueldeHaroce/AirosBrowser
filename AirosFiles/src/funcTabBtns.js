const homeBtn = document.getElementById('homeLogo');
homeBtn.addEventListener('click', () => {
  ipcRenderer.send('goMenu');
});
//