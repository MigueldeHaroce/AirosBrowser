const textInput = document.getElementById('textSearch');

textInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    search();
}
});

function search() {
    const searchTerm = textInput.value;
    const query = 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm);
    ipcRenderer.send('searchActual', query);
};