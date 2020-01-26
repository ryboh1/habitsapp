const {app, BrowserWindow, ipcMain } = require('electron');
const {sqlCommands:sqlCommands} = require("./model/sql-commands.js");
const {window:window} = require("./controller/window.js")
const {helpers:helpers} = require("./controller/helpers.js")
let SQL = new sqlCommands();

app.on("ready", function (){
  let theWindow = new window();
  theWindow.createWindow(BrowserWindow);

  SQL.createDatabase();
  SQL.createTables();
});


ipcMain.on("create-form-data", (event,data ) => {

  SQL.insertData("userCreateHabits",data);
  event.returnValue = "recieved";
});

ipcMain.on("break-form-data", (event,data) => {
  console.log("hello");
  SQL.insertData("userBreakHabits", data);
  event.returnValue = "recieved";  
});

ipcMain.on("goal-options", (event, habitOption) =>{
  let theHelper = new helpers();


  let thePromise = new Promise((resolve) => {
    SQL.getGoalData(habitOption, resolve);
  })

  .then((goalData) => {
    let goalDataArray = theHelper.changeToArray(goalData);
    event.reply("returned-options",goalDataArray );
  });

});