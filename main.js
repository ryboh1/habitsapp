const {app, BrowserWindow, ipcMain } = require('electron');
const {sqlCommands:sqlCommands} = require("./model/sql-commands.js");
const {window:window} = require("./controller/window.js")
const {helpers:helpers} = require("./controller/helpers.js")

let SQL = new sqlCommands();
let theHelper = new helpers();

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

  SQL.insertData("userBreakHabits", data);
  event.returnValue = "recieved";  
});

ipcMain.on("goal-options", (event, tableSelected) =>{

  new Promise((resolve) => {
    SQL.getData(tableSelected, "goalTwo",resolve);
  })

  .then((goalData) => {
    let goalDataArray = theHelper.getGoal(goalData);
    event.reply("returned-options",goalDataArray );
  });
});


ipcMain.on("cheat-sheet", (event, data) => {
  let tableSelected = data[0];
  let habitSelected = data[1];

  new Promise((resolve) => {
    SQL.getRow(tableSelected, "goalTwo",habitSelected, resolve);
  })

  .then((cheatSheetData) => {
    event.reply("returned-data",cheatSheetData[0]);
  });

});