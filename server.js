const express = require("express");
const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// default 404 response
app.use((req, res) => {
  res.status(404).end();
});

//FUNCTIONS START=============================================================
//for the veiw all db queries (view all departments/roles/employees)
const viewAll = (sql) => {
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    init();
  });
};

const createDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    },
  ]);
  //then feed into create function (sql, data)
};

const createRole = () => {
  //query for department then insert into prompt
  inquirer.prompt([
    //name
    {
      type: "input",
      name: "name",
      message: "What is the name of the role?",
    },
    //salary
    {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
    },
    //department
    {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: [], //TODO: Add list from query =============================================
      },
  ]);
  //then feed into create function (sql, data)
};

const createEmployee = () => {
  //query for role list and manager list
  //f name
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employees first name?",
    },
    //l name
    {
      type: "input",
      name: "last_name",
      message: "What is the employees last name?",
    },
    //role
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: [], //TODO: Add list from query =============================================
    },
    //manager
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: [], //TODO: Add list from query and null ===================================
    },
  ]);
  //then feed into create function (sql, data)
};

const createRows = (sql) => {};

const updateEmployee = () => {};

const init = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "first_choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee",
          "Quit",
        ],
      },
    ])
    .then((data) => {
      let sql = {};
      switch (data.first_choice) {
        case "View all departments":
          sql = `SELECT * FROM departments ORDER BY name`;
          viewAll(sql);
          break;
        case "View all roles":
          sql = `SELECT * FROM roles`;
          viewAll(sql);
          break;
        case "View all employees":
          //id, fn, ln, title (role), department, salary, manager (name, not id) ========================= TODO: sql declaration
          sql = `SELECT * FROM roles`;
          viewAll(sql);
          break;
        case "Add a department":
          createDepartment();
          break;
        case "Add a role":
          createRole();
          break;
        case "Add an employee":
          createEmployee();
          break;
        case "Update an employee":
          updateEmployee();
          break;
        case "Quit":
          process.exit();
      }
    });
};
//FUNCTIONS END ==============================================================

// start server
db.connect((err) => {
  if (err) throw err;
});

init();
