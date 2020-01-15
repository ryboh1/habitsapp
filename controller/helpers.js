exports.window = function window() {
  
  this.createWindow = (theBrowserWindow) => {
    // Create the browser window.
    let win = new theBrowserWindow({
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
  };
}