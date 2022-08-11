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
//TODO: sql statements in case switch
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
        //done
        case "View all departments":
          sql = `SELECT * FROM departments ORDER BY name`;
          viewAll(sql);
          break;
        case "View all roles":
          sql = `SELECT roles.id, roles.title, roles.salary,
          departments.name AS department FROM roles
          LEFT JOIN departments
          ON roles.department_id = departments.id;`;
          viewAll(sql);
          break;
        case "View all employees":
          sql = `SELECT employees.id, 
          CONCAT(employees.first_name,' ', employees.last_name) as employee,
          roles.title AS role, roles.salary AS salary, departments.name AS department,
          CONCAT(e2.first_name, ' ', e2.last_name) AS manager
          FROM employees
          LEFT JOIN roles ON employees.role_id = roles.id
          LEFT JOIN departments ON roles.department_id = departments.id
          LEFT JOIN employees e2 ON employees.manager_id = e2.id`;
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

//done
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

//done
//for the create and update db queries (create deparment/role/employee, update employee)
const createRows = (sql, params) => {
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Success!");
    init();
  });
};

//done
const createDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the name of the department.");
            return false;
          }
        },
      },
    ])
    .then((data) => {
      let sql = `INSERT INTO departments (name)
        VALUES (?)`;
      let params = [data.name];
      createRows(sql, params);
    });
};

//done
const createRole = () => {
  //query for department then insert into prompt
  const departmentArray = [];

  let sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((department) => {
      departmentArray.push(department.name);
    });
  });

  inquirer
    .prompt([
      //name
      {
        type: "input",
        name: "name",
        message: "What is the name of the role?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the name of the role.");
            return false;
          }
        },
      },
      //salary
      {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the role's salary.");
            return false;
          }
        },
      },
      //department
      {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: departmentArray,
      },
    ])
    .then((data) => {
      const deparmentId = departmentArray.indexOf(data.department) + 1;
      let sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?,?,?)`;
      let params = [data.name, data.salary, deparmentId];
      createRows(sql, params);
    });
};

//done
const createEmployee = () => {
  //query for roles then insert into prompt
  const roleArray = [];
  let roleSql = `SELECT * FROM roles`;
  db.query(roleSql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((role) => {
      roleArray.push(role.title);
    });
  });

  //query for employees then insert into prompt
  const employeeArray = [];
  let employeeSql = `SELECT * FROM employees`;
  db.query(employeeSql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((employee) => {
      employeeArray.push(`${employee.first_name} ${employee.last_name}`);
    });
  });

  inquirer
    .prompt([
      //f name
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's first name.");
            return false;
          }
        },
      },
      //l name
      {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's last name.");
            return false;
          }
        },
      },
      //role
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: roleArray,
      },
      //manager
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: employeeArray,
      },
    ])
    .then((data) => {
      const roleId = roleArray.indexOf(data.role) + 1;
      const managerId = employeeArray.indexOf(data.manager) + 1;
      let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES (?,?,?,?)`;
      let params = [data.first_name, data.last_name, roleId, managerId];
      createRows(sql, params);
    });
};

//low priority bug: Stall question in inquirer. Wasn't able to get TA code working.
const updateEmployee = () => {
  //query for employees then insert into prompt
  const employeeArray = [];
  let employeeSql = `SELECT * FROM employees`;
  db.query(employeeSql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((employee) => {
      employeeArray.push(`${employee.first_name} ${employee.last_name}`);
    });
    // console.log(employeeArray);
  });

  //query for roles then insert into prompt
  const roleArray = [];
  let roleSql = `SELECT * FROM roles`;
  db.query(roleSql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    rows.forEach((role) => {
      roleArray.push(role.title);
    });
  });

  inquirer
    .prompt([
      {
        type: "list",
        name: "stall",
        message: "Let's update an employee. (Press 'Enter')",
        choices: ["Let's do it."],
      },
      {
        type: "list",
        name: "employee",
        message: "What employee is getting updated?",
        choices: employeeArray,
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's new role?",
        choices: roleArray,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: employeeArray,
      },
    ])
    .then((data) => {
      const roleId = roleArray.indexOf(data.role) + 1;
      const employeeId = employeeArray.indexOf(data.employee) + 1;
      const managerId = employeeArray.indexOf(data.manager) + 1;
      let sql = `UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ?`;
      let params = [roleId, managerId, employeeId];
      createRows(sql, params);
    });
};

//FUNCTIONS END ==============================================================

// start server
db.connect((err) => {
  if (err) throw err;
});

init();
