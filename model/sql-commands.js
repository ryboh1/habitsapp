const mysql = require('mysql');
const {sqlQueries:sqlQueries} = require("./sql-queries.js");

exports.sqlCommands = function sqlCommands(){

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "password",
      });
      
    connection.connect((err) => {
        if (err) throw err;
        console.log('MySQL Connected...');
    });
      
    let SQL = new sqlQueries(connection);

    this.createDatabase = () => {

        let createDatabase ="CREATE DATABASE IF NOT EXISTS userHabits";
        let UseDatabase =  "USE userHabits;"
        SQL.queryDatabase(createDatabase);
        SQL.queryDatabase(UseDatabase);
    };

    this.createTables = () => {

        createTable = `CREATE TABLE IF NOT EXISTS userCreateHabits (
            id INT NOT NULL AUTO_INCREMENT,

            goalOne VARCHAR(50),
            goalTwo VARCHAR(50),
            responseOne VARCHAR(50),
            vEasy VARCHAR(50),
            easy VARCHAR(50),
            normal VARCHAR(50),
            difficult VARCHAR(50),
            vDifficult VARCHAR(50),
            rewardOne VARCHAR(50),
            rewardTwo VARCHAR(50), 
            cueOne VARCHAR(50), 
            cueTwo VARCHAR(50), 
            cravingOneA VARCHAR(50),
            cravingOneB VARCHAR(50),
            cravingOneC VARCHAR(50),
            cravingTwo VARCHAR(50), 

            PRIMARY KEY (id)
        );`
        breakTable = `CREATE TABLE IF NOT EXISTS userBreakHabits (
            id INT NOT NULL AUTO_INCREMENT,
            
            goalOne VARCHAR(50),
            goalTwo VARCHAR(50),
            responseOne VARCHAR(50),
            vEasy VARCHAR(50),
            easy VARCHAR(50),
            normal VARCHAR(50),
            difficult VARCHAR(50),
            vDifficult VARCHAR(50),
            rewardOne VARCHAR(50),
            rewardTwo VARCHAR(50), 
            cueOne VARCHAR(50), 
            cueTwo VARCHAR(50), 
            cravingOneA VARCHAR(50),
            cravingOneB VARCHAR(50),
            cravingOneC VARCHAR(50),
            cravingTwo VARCHAR(50), 

            PRIMARY KEY (id)
        );`
        SQL.queryDatabase(createTable);
        SQL.queryDatabase(breakTable);
    };

    this.insertData = (theTable, theData) => {

        let thePromise = new Promise((resolve, reject) => {
            let insertEmptyRow = `INSERT INTO ${theTable}() VALUES();`;
            SQL.queryDatabase(insertEmptyRow);

            let selectEmptyRow = `SELECT @@IDENTITY`;
            SQL.getValue(selectEmptyRow, resolve);
        })

        .then((emptyRowObject) => {
            let theEmptyRowID = emptyRowObject[0]["@@IDENTITY"]
            let formLength = theData.length;

            for(let i = 0; i < formLength; i++){
                let formColumn = theData[i]["name"];
                let formValue = theData[i]["value"];
                
                let insertColumnData = `UPDATE ${theTable} SET ${formColumn} = "${formValue}" WHERE id = ${theEmptyRowID}; `;
                SQL.queryDatabase(insertColumnData);
            };
        });
    };

    this.getGoalData = (theOption, theResolve) => {

        let thePromise = new Promise((resolve) =>{
            SQL.getValue(`SELECT goalTwo FROM user${theOption}Habits;`, resolve);
        })

        .then((result) => {
            theResolve(result);
        });
    };

}