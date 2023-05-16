const textInput = document.getElementById('textSearch');

textInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
    search();
    event.preventDefault();
}
});

function search() {
    const query = textInput.value;
    ipcRenderer.send('searchBarActual', query);
    
};

