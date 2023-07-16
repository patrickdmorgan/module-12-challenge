const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
//const sql = require("./sql");

//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'employeesDB'
});

// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    firstPrompt();
  });
