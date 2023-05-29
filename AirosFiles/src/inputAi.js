const chatContainer = document.getElementById('background');
const userInput = document.getElementById('text-input');
const sendButton = document.getElementById('searchBtn');

// Event listener for user input
sendButton.addEventListener('click', function() {
    const message = userInput.value;
    insertMessage('User', message);
    userInput.value = '';

    // Send user input to the main process
    ipcRenderer.send('user-message', message);
});

// Event listener for receiving AI response
ipcRenderer.on('ai-response', function(response) {
    displayMessage('AI', response);
});


const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
  const messages = document.querySelector('.messages-content');
  let d, h, m;
  let i = 0;

  function updateScrollbar() {
    ipcRenderer.send('update-scrollbar');
  }

  function setDate() {
    d = new Date();
    if (m !== d.getMinutes()) {
      m = d.getMinutes();
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.textContent = d.getHours() + ':' + m;
      const lastMessage = document.querySelector('.message:last-child');
      lastMessage.appendChild(timestamp);
    }
  }

  function insertMessage() {
    const input = document.querySelector('.message-input');
    const msg = input.value.trim();
    if (msg === '') {
      return false;
    }
    const message = document.createElement('div');
    message.className = 'message message-personal';
    message.textContent = msg;
    const mCSBContainer = document.querySelector('.mCSB_container');
    mCSBContainer.appendChild(message);
    message.classList.add('new');
    setDate();
    input.value = '';
    updateScrollbar();
    setTimeout(function() {
      callAi();
    }, 1000 + (Math.random() * 20) * 100);
  }

  const messageSubmit = document.querySelector('.message-submit');
  messageSubmit.addEventListener('click', function() {
    insertMessage();
  });

  window.addEventListener('keydown', function(e) {
    if (e.which === 13) {
      insertMessage();
      return false;
    }
  });

  const Fake = [
    'Hi there, I\'m Fabio and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    'That\'s awesome',
    'Codepen is a nice place to stay',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new codepen',
    'Bye',
    ':)'
  ];

  function callAi() {
    const input = document.querySelector('.message-input');
    if (input.value !== '') {
      return false;
    }
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message loading new';
    loadingMessage.innerHTML = '<figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span>';
    const mCSBContainer = document.querySelector('.mCSB_container');
    mCSBContainer.appendChild(loadingMessage);
    updateScrollbar();

    setTimeout(function() {
      const loading = document.querySelector('.message.loading');
      loading.parentNode.removeChild(loading);
      const newMessage = document.createElement('div');
      newMessage.className = 'message new';
      newMessage.innerHTML = '<figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i];
      mCSBContainer.appendChild(newMessage);
      newMessage.classList.add('new');
      setDate();
      updateScrollbar();
      i++;
    }, 1000 + (Math.random() * 20) * 100);
  }

  setTimeout(function() {
    fakeMessage();
  }, 100);

  ipcRenderer.on('update-scrollbar', function() {
    updateScrollbar();
  });
});
