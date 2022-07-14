const express = require("express");
const db = require("./db/connection");
const cTable = require("console.table"); //console.table instead of log
const apiRoutes = require("./routes/apiRoutes");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use api routes
app.use("/api", apiRoutes);

// default 404 response
app.use((req, res) => {
  res.status(404).end();
});

const init = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "main_menu",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update and employee",
      ],
    },
  ])
  .then((data) => {
    //switch case for each
  });
};

// start server
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

init();

// inquirer.prompt
// what would you like to do?
//(view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role)
//view all departments/roles/employees => call the appropriate get route and display data with console.table
//add a department/role/employee => call theappropriate post route and display a success message
//update employee role => enter name/salary/department => call the put route, display sucess message
//.then what would you like to do?
