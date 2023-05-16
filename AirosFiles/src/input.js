
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
    const query = `https://www.google.com/search?q=${encodeURIComponent(textInput.value)}`;
    ipcRenderer.send('search', query);
};