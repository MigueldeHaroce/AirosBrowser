
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
    const query = textInput.value;
    window.ipcRenderer.send('search', query);
    console.error('Received search event with data:', query);

};