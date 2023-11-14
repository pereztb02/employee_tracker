INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, 1),
       ("Amira", "Afzal", 2, 2),
       ("Christoper", "Lee", 2, 2),
       ("Verónica", "Rodriguez", 3),
       ("Igor", "Ivanov", 3);

INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "HR"),
       (3, "Customer Service"),
       (4, "Legal"),
       (5, "Quality Assurance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Associate", 40000.00, 1),
       ("HR Generalist", 50000.00, 2),
       ("HR Generalist", 50000.00, 2),
       ("Floor Manager", 80000.00, 3),
       ("Floor Manager", 80000.00, 3);