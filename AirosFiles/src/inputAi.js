document.addEventListener('DOMContentLoaded', function() {
  const messages = document.getElementById('background');
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
    const input = document.getElementById('text-input');
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
    setTimeout(callAi, 1000 + (Math.random() * 20) * 100);
  }

  const messageSubmit = document.getElementById('searchBtn');
  messageSubmit.addEventListener('click', insertMessage);

  window.addEventListener('keydown', function(e) {
    if (e.which === 13) {
      insertMessage();
      return false;
    }
  });

  function callAi() {
    const input = document.getElementById('searchBtn');
    if (input.value !== '') {
      return false;
    }
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message loading new';
    loadingMessage.innerHTML = '<figure class="avatar"><img src="icons/logo24pxMono.png" style="width:36px; height:36px;"/></figure><span></span>';
    const mCSBContainer = document.querySelector('.mCSB_container');
    mCSBContainer.appendChild(loadingMessage);
    updateScrollbar();
    ipcRenderer.on('ai-response', (response) => {
      const loading = document.querySelector('.message.loading');
      loading.parentNode.removeChild(loading);
      const newMessage = document.createElement('div');
      newMessage.className = 'message new';
      newMessage.innerHTML = '<figure class="avatar"><img src="icons/logo24pxMono.png" style="width:36px; height:36px;"/></figure>' + response;
      mCSBContainer.appendChild(newMessage);
      newMessage.classList.add('new');
      setDate();
      updateScrollbar();
      i++;

      // Call waitForAIResponse again to wait for the next response
      waitForAIResponse();
    });

    // Function to wait for the 'ai-response' event
    function waitForAIResponse() {
      // Check if the response has arrived
      if (document.querySelector('.message.loading') === null) {
        return;
      }

      // Set a delay before checking for the event again
      setTimeout(waitForAIResponse, 1000 + (Math.random() * 20) * 100);
    }

    // Start waiting for the initial response
    waitForAIResponse();
  }

  ipcRenderer.on('update-scrollbar', updateScrollbar);
});
