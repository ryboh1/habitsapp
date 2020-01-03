const { app, BrowserWindow } = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 850,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('./templates/index.html')


  // Chrome Dev Tools
  win.webContents.openDevTools()

}
app.on('ready', createWindow)