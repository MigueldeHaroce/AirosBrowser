const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron');
const path = require('path');
const openai = require('openai');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1000,
    minHeight: 1000,
    minWidth: 1200,
    frame: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js'),
      contentSecurityPolicy: "default-src 'self'",
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'searchMenu.html'));

  mainWindow.on("ready-to-show", function () {
    mainWindow.show();
    mainWindow.focus();
  });

// The load url its not working !! Fix next time 1!
  // Open the DevTools
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("close", () =>{
  app.quit();
});

ipcMain.on("minimize", () =>{
  BrowserWindow.getFocusedWindow().minimize();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("restore", () => {
  if (BrowserWindow.getFocusedWindow().isMaximized()) {
    BrowserWindow.getFocusedWindow().restore();
  } else {
    BrowserWindow.getFocusedWindow().maximize()
  }
});

ipcMain.on("pass_page", () => {
  BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/facts.html');
});

ipcMain.on("pass_page2", () => {
  BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/searchMenu.html');
});

// main.js
const resultsStack = { /* ID: results */ };

ipcMain.on('search', (event, query) => {
  const url = query;
  console.log(query);
  console.log(url);
  const searchID = "ID-" + new Date().getTime();
  resultsStack[searchID] = url;
  BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/searchPage.html?searchID='+ searchID);
});

ipcMain.on('pull-search', (event, searchID) => {
  console.log(searchID);
  console.log(resultsStack[ searchID ]);
  console.log('va');

  if (resultsStack[ searchID ]) {
    event.sender.send('search-results', resultsStack[ searchID ]);
    delete resultsStack[ searchID ];
  } else {
    console.log("no id");
    event.sender.send('search-results', { error: "Unknown ID" });
  }
});

ipcMain.on('searchBarActual', (event, query) => {
  const url = query;
  console.log(query);
  console.log(url);
  event.sender.send('search-results-actual', url)
});

ipcMain.on('goMenu', (event) => {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 0,
    title: 'Confirmation',
    message: 'This will resset all tabs'
  }).then((response) => {
    if (response.response === 0) {
      BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/searchMenu.html?searchID=');
    } else {
      console.log('Button not pressed.');
    }
  });
});

ipcMain.on('addHistory', (event, results) => {
  event.sender.send('addHistoryList', results)
});

ipcMain.on('changeAi', () => {
  BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/askAi.html');
});



const gpt = new openai.OpenAIApi('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');

ipcMain.on('user-message', async (event, message) => {
  try {
    const response = await gpt.createCompletion({
      engine: 'davinci',
      prompt: message,
      maxTokens: 100,
      temperature: 0.7
    });

    const aiResponse = response.choices[0].text.trim();

    event.reply('ai-response', aiResponse);
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
});
