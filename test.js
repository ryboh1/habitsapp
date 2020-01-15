const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'habitsapp'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});