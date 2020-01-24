const {app, BrowserWindow, ipcMain } = require('electron');
const {sqlCommands:sqlCommands} = require("./model/sql-commands.js");
const {window:window} = require("./controller/helpers.js")

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

ipcMain.on("goal-options", (event, data) =>{

  if(data == "create"){
    SQL.getGoalData();
  }


  if(data == "break"){
    console.log("break");
  };

});