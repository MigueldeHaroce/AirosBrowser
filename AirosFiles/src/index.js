const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

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
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      contentSecurityPolicy: "default-src 'self'",
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

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

  
