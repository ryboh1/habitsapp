const { app, BrowserWindow } = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    resizable:false
  });

  // and load the index.html of the app.
  win.loadFile('./templates/index.html')


  // Chrome Dev Tools
  win.webContents.openDevTools()

}
app.on('ready', createWindow)