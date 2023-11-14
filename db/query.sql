SELECT *
FROM employee
JOIN employee AS manager ON employee.manager_id = manager.id;

SELECT *
FROM employee 
JOIN role ON employee.role_id = role.id;

SELECT *
FROM role 
JOIN department ON role.department_id = department.id;