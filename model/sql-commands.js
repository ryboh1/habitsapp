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
            usersHabitData VARCHAR(2000) NOT NULL,
            PRIMARY KEY (id)
        );`
        breakTable = `CREATE TABLE IF NOT EXISTS userBreakHabits (
            id INT NOT NULL AUTO_INCREMENT,
            usersHabitData VARCHAR(2000) NOT NULL,
            PRIMARY KEY (id)
        );`
        SQL.queryDatabase(createTable);
        SQL.queryDatabase(breakTable);
    };

    this.insertData = (theTable, theData) => {
        let insertForm = `INSERT INTO ${theTable}(usersHabitData) VALUES("${theData}");`;
        SQL.queryDatabase(insertForm);
    };

}