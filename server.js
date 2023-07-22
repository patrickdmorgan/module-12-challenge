const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
//const sql = require("./sql");

//mysql connection
const connection = mysql.createConnection({
    host: '127.0.0.1',

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
    // run start function after connection is made to prompt the user
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
          "View Departments",
          "Add Department",
          "View Employees",
          "View Roles",
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

          case "View Departments":
            viewDepartments();
            break;

          case "Add Department":
            addDepartment();
            break;
          
          case "View Employees":
            viewEmployees();
            break;

          case "View Roles":
            viewRoles();
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

  //"View DepartmentsS"/ READ all, SELECT * FROM//
  function viewDepartments() {
    console. log("View Departments");

    var query = 'SELECT * FROM department'
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Departments Viewed\n");
  
      firstPrompt();
    });
  }

  function addDepartment() {
    console.log("Inserting an department!")

    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department name?"
      }
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO department SET ?`
      // Prompting done, insert new item into the db with info provided
      connection.query(query,
        { name: answer.name },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
    });
  }

  function viewEmployees() {
    console.log("Viewing employees\n");

    var query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON r.department_id = d.id
    LEFT JOIN employee e2
    ON e.manager_id = e2.id
    `

    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
}

// "View Employees by Department" / READ by, SELECT * FROM

function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
  
    var query =
      `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  
    connection.query(query, function (err, res) {
      if (err) throw err;

      const departmentChoices = res.map(({ id, name }) => ({
        name: `${id} ${name}`,
        value: id
      }));
 
     console.table(res);
     console.log("Department view succeed!\n");
 
     promptDepartment(departmentChoices);
   });
 }

  //"View Roles"/ READ all, SELECT * FROM//
  function viewRoles() {
    console. log("View Roles");

    var query = 'SELECT * FROM role'
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Roles Viewed\n");
  
      firstPrompt();
    });
  }

 // User chooses from the department list, then the employees render

 function promptDepartment(departmentChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to choose?",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer", answer.departmentId);
  
        var query =
          `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
    FROM employee e
    JOIN role r
      ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    WHERE d.id = ?`
  
        connection.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed!\n");
  
          firstPrompt();
        });
      });
  }

// Make an employee array
function addEmployee() {
    console.log("Inserting an employee!")
  
    var role_query = 'SELECT * FROM role'

    connection.query(role_query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, name: `${title}`, salary: `${salary}`
      }));
  
      var employee_query = 'SELECT * FROM employee'

      connection.query(employee_query, function (err, res) {
        if (err) throw err;

        const employeeChoices = res.map(({ id, first_name, last_name }) => ({
          value: id, name: `${first_name} ${last_name}`
        }))

        promptInsert(roleChoices, employeeChoices);
      });
    });
  }

function promptInsert(roleChoices, employeeChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Employee's first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "Employee's last name?"
      },
      {
        type: "list",
        name: "roleId",
        message: "Employee's role?",
        choices: roleChoices
      },
      {
        type: "list",
        name: "managerId",
        message: "Employee's manager?",
        choices: employeeChoices
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`
      // Prompting done, insert new item into the db with info provided
      connection.query(query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.insertedRows + "Inserted successfully!\n");

          firstPrompt();
        });
    });
}

// Employee array to delete employee

function removeEmployees() {
    console.log("Deleting an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name
        FROM employee e`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ArrayToDelete!\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }

// User chooses employee to delete

function promptDelete(deleteEmployeeChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
  
        var query = `DELETE FROM employee WHERE ?`;
        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log(res.affectedRows + "Deleted!\n");
  
          firstPrompt();
        });
      });
  }

  // updates the employees role / UPDATE//

function updateEmployeeRole() { 
    employeeArray();
  
  }
  
  function employeeArray() {
    console.log("Updating an employee");
  
    var query =
      `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r
      ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    JOIN employee m
      ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));
  
      console.table(res);
      console.log("employeeArray To Update!\n")
  
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating an role");
  
    var query =
      `SELECT r.id, r.title, r.salary 
    FROM role r`
    let roleChoices;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`      
      }));
  
      console.table(res);
      console.log("roleArray to Update!\n")
  
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }
  
  function promptEmployeeRole(employeeChoices, roleChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to set with the role?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to update?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        connection.query(query,
          [ answer.roleId,  
            answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully!");
  
            firstPrompt();
          });
      });
  }

// add a role 

function addRole() {

    var query = `SELECT * FROM department`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      // callback function
      const departmentChoices = res.map(({ id, name }) => ({
        value: id, name: `${id} ${name}`
      }));
  
      console.log("Department array");
  
      promptAddRole(departmentChoices);
    });
  }
  
  function promptAddRole(departmentChoices) {
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Role title?"
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Role Salary?"
        },
        {
          type: "list",
          name: "departmentId",
          message: "Department?",
          choices: departmentChoices
        },
      ])
      .then(function (answer) {
  
        var query = `INSERT INTO role SET ?`
  
        connection.query(query, {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.departmentId
        },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Role Inserted!");
  
            firstPrompt();
          });
  
      });
  }
  