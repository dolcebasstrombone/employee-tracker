INSERT INTO departments (name)
VALUES
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Lead Engineer", 150000, 1),
    ("Software Engineer", 120000, 1),
    ("Account Manager", 160000, 2),
    ("Accountant", 125000, 2),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3),
    ("Sales Lead", 100000, 4),
    ("Salesperson", 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Josie", "Franklin", 1, NULL),
    ("Brandon", "Lu", 3, NULL),
    ("Vivian", "Hance", 7, NULL),
    ("Rachel", "McLaughlin", 5, NULL),
    ("Elisha", "Dean", 6, 4),
    ("Andrew", "Scroggs", 4, 2),
    ("Cas", "Griffin", 2, 1),
    ("Adam", "Campbell", 8, 3);