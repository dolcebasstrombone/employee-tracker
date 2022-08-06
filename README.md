# employee-tracker

* install mysql2
* inquirer
* console.table package

![Table Flow](./assets/images/table-flow.png)

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department (TODO) that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to


WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```