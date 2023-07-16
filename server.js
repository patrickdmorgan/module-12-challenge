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

// function which prompts the user for what action they should take
function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "Update Employee Manager",
          "View Employees by Department",
          "View Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee by Role",
          "Add Role",
          "Remove Role",
          "End"]
      })
      .then(function ({ task }) {
        switch (task) {
  
          case "View Employees":
            viewEmployee();
            break;
  
          case "Update Employee MAnager":
            updateEmployeeManager();
            break;
  
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
  
          case "View Employees by Manager":
             viewEmployeeByManager();
             break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Remove Employee":
            removeEmployee();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Remove Role":
             removeRole();
             break;
  
          case "End":
            connection.end();
            break;
        }
      });
  }
  
  //"View Employees"/ READ all, SELECT * FROM
  
  function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
    // console.log(query.sql);
  }
  