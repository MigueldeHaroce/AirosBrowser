const chatContainer = document.getElementById('background');
const userInput = document.getElementById('text-input');
const sendButton = document.getElementById('searchBtn');

// Event listener for user input
sendButton.addEventListener('click', function() {
    const message = userInput.value;
    displayMessage('User', message);
    userInput.value = '';

    // Send user input to the main process
    ipcRenderer.send('user-message', message);
});

// Event listener for receiving AI response
ipcRenderer.on('ai-response', function(event, response) {
    displayMessage('AI', response);
});

// Display messages in the chat container
function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}