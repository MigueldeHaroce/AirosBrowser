const { ipcRenderer } = require('electron');

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
    const query = searchInput.value;
    ipcRenderer.send('search', query);
};