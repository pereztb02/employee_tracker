const db = require("./connections");
const inquirer = require("inquirer");

const questions = () => {
  inquirer
    .prompt([
      {
        //put questions here view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        type: "list",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
        name: "option",
        message: "What would you like to do?",
      },
    ])
    .then((answers) => {
      if (answers.option === "view all departments") {
        viewDepts();
      } else if (answers.option === "view all employees") {
        viewEmployees();
      } else if (answers.option === "view all roles") {
        viewRoles();
      } else if (answers.option === "add a department") {
        addDept();
      } else if (answers.option === "add a role") {
        addRole();
      } else if (answers.option === "add an employee") {
        addEmployee();
      } else if (answers.option === "update an employee role") {
        updateEmployeeRole();
      }
    });
};

const viewDepts = () => {
  db.query(" SELECT * FROM department", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
    questions();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
    questions();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.table(data);
    questions();
  });
};

const addDept = () => {
  inquirer
    .prompt([
      { type: "input", name: "name", message: "Name of new department: " },
    ])
    .then((answers) => {
      db.query("INSERT INTO department SET ?", answers, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
        questions();
      });
    });
};
// Async/await added to addRole function
const addRole = async () => {
  //asynchronously query the db to fetch all * columns from the department table
  const deptData = await db.promise().query("SELECT * FROM department");
  //  take the deptData as an array of objects. Assign the name property to the name column and the value property as the id column
  const deptArray = deptData[0].map((department) => ({
    name: department.name,
    value: department.id,
  }));
  console.log(deptArray);
  inquirer
    .prompt([
      { type: "input", name: "title", message: "Name of new role: " },
      { type: "input", name: "salary", message: "Salary?" },
      {
        type: "list",
        name: "department_id",
        message: "Add to which department?",
        choices: deptArray, // The user will be shown the deptArray as their list of choices
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO role SET ?", answers, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
        questions();
      });
    });
};

const addEmployee = async () => {
  const employeeData = await db.promise().query("SELECT * FROM employee");
  // const employeeArray = employeeData[0].map((employee) => ({
  //   name: employee.first_name,
  //   value: employee.id,
  // }));
  const roleData = await db.promise().query("SELECT * FROM role");
  const roleArray = roleData[0].map((role) => ({
    name: role.title,
    value: role.id,
  }));
  // const deptData = await db.promise().query("SELECT * FROM department");
  // // const deptArray = deptData[0].map((department) => ({
  // //   name: department.name,
  // //   value: department.id,
  // // }));
  const managerArray = employeeData[0].map((employee) => ({
    name: employee.first_name,
    value: employee.id,
  }));
  inquirer
    .prompt([
      { type: "input", name: "first_name", message: "First name: " },
      { type: "input", name: "last_name", message: "Last name: " },
      {
        type: "list",
        name: "manager_id",
        message: "Who will they be reporting to?",
        choices: managerArray,
      },
      {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: [...roleArray, { name: "Enter new role", value: "newRole" }],
      },
      // { type: "input", name: "salary", message: "Salary: " },
      // {
      //   type: "list",
      //   name: "department_id",
      //   message: "Add to which department?",
      //   choices: deptArray,
      // },
    ])
    .then(async (answers) => {
      if (answers.role === "newRole") {
        // Prompt the user to enter a new role
        const newRoleAnswer = await inquirer.prompt({
          type: "input",
          name: "newRole",
          message: "Enter the new role:",
        });
      }

        // Insert the new role into the database
        // const result = await db
        //   .promise()
        //   .query("INSERT INTO role (title, salary) VALUES (?, ?)", [
        //     newRoleAnswer.newRole,
        //     answers.salary,
        //   ]);
        // console.log(`New role added: ${newRoleAnswer.newRole}`);

        const employeeResult = await db
          .promise()
          .query("INSERT INTO employee SET ?", {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role,
            manager_id: answers.manager_id,
            // Ensure a valid department_id is provided
            // department_id: answers.department_id !== "newDept" ? answers.department_id : null,
          });
        console.table(employeeResult);
        questions();
      }
    );
};

const updateEmployeeRole = async () => {
  const employeeData = await db.promise().query("SELECT * FROM employee");
  const employeeArray = employeeData[0].map((employee) => ({
    name: employee.first_name,
    value: employee.id,
  }));
  console.log(employeeArray);
  const deptData = await db.promise().query("SELECT * FROM role");
  const deptArray = deptData[0].map((department) => ({
    name: department.title,
    value: department.id,
  }));
  inquirer
    .prompt([
      {
        type: "list",
        choices: employeeArray,
        name: "first_name",
        message: "Which employee do you want to update?",
      },
      {
        type: "list",
        choices: deptArray,
        name: "name",
        message: "Choose new role: ",
      },
    ])
    .then((answers) => {
      db.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.name, answers.first_name], (err, data) => {
        if (err) {
          console.log(err);
        }
        console.table(data);
        questions();
      });
    });
};
// .catch((err) => console.error(err));

questions();
