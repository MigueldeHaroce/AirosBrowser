const { ipcRenderer } = require('electron');

const searchBtn = document.getElementById('searchBtn');
const textInput = document.getElementById('text-input');

textInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    console.log("a")
    search();
}
});

searchBtn.addEventListener('click', () => {
    console.log("a")
    search();
});

function search() {
    const searchText = textInput.value;
    if (searchText) {
        ipcRenderer.invoke('search-text', searchText);
    }
}
