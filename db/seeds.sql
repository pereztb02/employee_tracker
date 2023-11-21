USE employee_db;
INSERT INTO department (name)
VALUES ("Sales"),
       ("HR"),
       ("Customer Service"),
       ("Legal"),
       ("Quality Assurance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 40000.00, 1),
       ("HR Generalist", 50000.00, 2),
       ("HR Generalist", 50000.00, 2),
       ("Floor Manager", 80000.00, 3),
       ("Floor Manager", 80000.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christoper", "Lee", 2, NULL),
       ("Elliot", "Smith", 1, 1),
       ("Amira", "Afzal", 2, 1),
       ("Verónica", "Rodriguez", 3, 1),
       ("Igor", "Ivanov", 3, 1);