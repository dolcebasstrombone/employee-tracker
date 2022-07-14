

INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales')

INSERT INTO role (title, salary, department_id)
VALUES
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id) //manager_id can be null
VALUES 
    ('Josie', 'Franklin', 1, null)
    ('Brandon', 'Lu', 3, null),
    ('Vivian', 'Hance', 7, null),
    ('Rachel', 'McLaughlin', 5, null),
    ('Elisha', 'Dean', 6, 4),
    ('Andrew', 'Scroggs', 4, 2),
    ('Cas', 'Griffin', 2, 1),
    ('Adam', 'Campbell', 8, 3)