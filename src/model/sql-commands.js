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

            goalOne VARCHAR(100),
            goalTwo VARCHAR(100),
            responseOne VARCHAR(100),
            vEasy VARCHAR(100),
            easy VARCHAR(100),
            normal VARCHAR(100),
            difficult VARCHAR(100),
            vDifficult VARCHAR(100),
            rewardOne VARCHAR(100),
            rewardTwo VARCHAR(100), 
            cueOne VARCHAR(100), 
            cueTwo VARCHAR(100), 
            cravingOneA VARCHAR(100),
            cravingOneB VARCHAR(100),
            cravingOneC VARCHAR(100),
            cravingTwo VARCHAR(100), 

            PRIMARY KEY (id)
        );`
        breakTable = `CREATE TABLE IF NOT EXISTS userBreakHabits (
            id INT NOT NULL AUTO_INCREMENT,
            
            goalOne VARCHAR(100),
            goalTwo VARCHAR(100),
            responseOne VARCHAR(100),
            vEasy VARCHAR(100),
            easy VARCHAR(100),
            normal VARCHAR(100),
            difficult VARCHAR(100),
            vDifficult VARCHAR(100),
            rewardOne VARCHAR(100),
            rewardTwo VARCHAR(100), 
            cueOne VARCHAR(100), 
            cueTwo VARCHAR(100), 
            cravingOneA VARCHAR(100),
            cravingOneB VARCHAR(100),
            cravingOneC VARCHAR(100),
            cravingTwo VARCHAR(100), 

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

    this.getData = (theOption, theSelection,theResolve) => {

        let thePromise = new Promise((resolve) =>{
            SQL.getValue(`SELECT ${theSelection} FROM user${theOption}Habits;`, resolve);
        })

        .then((result) => {
            theResolve(result);
        });
    };

    this.getRow = (tableName, rowColumn, rowValue, theResolve) => {

        new Promise((resolve) =>{
            SQL.getValue(`SELECT * FROM user${tableName}Habits WHERE ${rowColumn} = "${rowValue}";`, resolve);
        })

        .then((result) => {
            theResolve(result);
        });
    };

}