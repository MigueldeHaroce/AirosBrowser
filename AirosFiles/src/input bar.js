const textInput = document.getElementById('textSearch');

textInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    search();
}
});

function search() {
    const query = `https://www.google.com/search?q=${encodeURIComponent(textInput.value)}`;
    ipcRenderer.send('searchBarActual', query);
};