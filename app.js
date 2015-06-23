var path = require('path');
var app = require('app');
var BrowserWindow = require('browser-window');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function windowAllClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function ready() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  // and load the index.html of the app.
  mainWindow.loadUrl(path.join('file://', __dirname, '/dist/index.html'));
  // Open the devtools.
  mainWindow.openDevTools({
    detached: true
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', function closed() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
