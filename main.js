const { app, BrowserWindow, ipcMain } = require('electron');
const {sqlCommands:sqlCommands} = require("./controller/sql-commands.js");

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
app.on("ready", createWindow);

app.on("ready",() => {
  let theSQL = new sqlCommands();

  theSQL.createDatabase();
  theSQL.createTables();
});

//Create Habit Save Form request
ipcMain.on("create-form-data", (event,data ) => {

});