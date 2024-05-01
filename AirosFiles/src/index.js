const { app, BrowserWindow, ipcMain, webContents, dialog } = require('electron');
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const { measureMemory } = require('vm');

const Web3 = require('web3').default;
const fs = require('fs');
const solc = require('solc');

const web3 = new Web3('https://sepolia.infura.io/v3/b9750da435b048b885b77e0b1d42724b');

const source = fs.readFileSync(path.join(__dirname, 'pass.sol'), 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    'pass.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

for (let contractName in output.contracts['pass.sol']) {
  console.log(contractName + ': ' + output.contracts['pass.sol'][contractName].evm.bytecode.object);
}

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

const contractABI = compiledContract.contracts['pass.sol']['Keychain'].abi;
const contractBytecode = compiledContract.contracts['pass.sol']['Keychain'].evm.bytecode.object;
const arg1 = 'arg1'; 
const arg2 = 'arg2';
const contract = new web3.eth.Contract(contractABI);
const deploy = contract.deploy({ 
  data: contractBytecode, 
  arguments: [arg1, arg2] 
});
const account = web3.eth.accounts.privateKeyToAccount('0xb062fa28696d5b56fe0ad7d5b7ef616c9c1c5dcd3352cd4958fdcd5ab1ac17ed');
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
deploy.send({ from: account.address, gas: 1500000, gasPrice: '30000000000000' });

web3.eth.getBalance(account.address).then(console.log);

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

ipcMain.on('setKey', (event, key, value) => {
  contract.methods.setKey(key, value).send({ from: account.address });
});

ipcMain.on('getValue', async (event, key) => {
  const value = await contract.methods.getValue(key).call();
  event.sender.send('getValueResponse', value);
});
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

ipcMain.on('changeWeb', () => {
  BrowserWindow.getFocusedWindow().loadURL('file://' + __dirname + '/searchMenu.html');
});
/////////////////////////////AI/////////////////////////////////////
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

ipcMain.on('user-message', async (event, myMessage) => {
  console.log(myMessage);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: myMessage}],
  });
  console.log(completion.data.choices[0].message);
  event.sender.send('ai-response', completion.data.choices[0].message.content);
    // Handle other errors or display an appropriate error message to the user.
});