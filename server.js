const mysql = require("mysql");
const inquirer = require("inquirer");
const DB_PASSWORD = require("./password.js");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, 
  user: "root",
  password: DB_PASSWORD,
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  inintialize();
});

const inintialize = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "taskSelector",
      message: "What would you like to do?",
      choices: ["Add a Department", "Add a Role", "Add an Employee", "View all Departments", "View all Roles", "View all Employees", "Update an Employee Role ", "Update an Employee Manager", "Delete a Department", "Delete a Role", "Delete an Employee", "Exit"]
    }
  ]).then((response) => {
    if(response.taskSelector === "Add a Department") {
      addDepartment();
    } else if(response.taskSelector === "Add a Role") {
      addRole();
    } else if(response.taskSelector === "Add an Employee") {
      addEmployee();
    } else if(response.taskSelector === "View all Departments") {
      viewDepartments();
    } else if(response.taskSelector === "View all Roles") {
      viewRoles();
    } else if(response.taskSelector === "View all Employees") {
      viewEmployees();
    } else if(response.taskSelector === "Update an Employee Role") {
      updateRole();
    } else if(response.taskSelector === "Update an Employee Manager") {
      updateManager();
    } else if(response.taskSelector === "Delete a Department") {
      deleteDepartment();
    } else if(response.taskSelector === "Delete a Role") {
      deleteRole();
    } else if(response.taskSelector === "Delete an Employee") {
      deleteEmployee();
    } else {
      connection.end();
    }
  });
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "Enter the name of the new Department."
    }
  ]).then((response) => {
      connection.query("INSERT INTO department SET ?", 
      {department_name: response.newDepartment},
      (err) => {
        if(err) throw err;
        console.log("New Department was Added.");
        viewDepartments();
      }
      );
  });
}

const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "Enter the name of the new Role."
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "Enter the Salary for the new Role."
    },
    {
      type: "input",
      name: "departmentID",
      message: "Enter the Department ID number of the new Role."
    },
  ]).then((response) => {
      connection.query("INSERT INTO role SET ?", 
      {
        role_title: response.newRole,
        salary: response.newRoleSalary,
        department_id: response.departmentID
      },
      (err) => {
        if(err) throw err;
        console.log("New Role was Added.");
        viewRoles();
      }
      );
  });
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "newEmployeeFirstName",
      message: "Enter the First Name of the new Employee."
    },
    {
      type: "input",
      name: "newEmployeeLastName",
      message: "Enter the Last Name of the new Employee."
    },
    {
      type: "input",
      name: "newEmployeeRole",
      message: "Enter the Role ID number of the new Employee."
    },
    {
      type: "input",
      name: "newEmployeeManager",
      message: "Enter the Manager ID number of the new Employee (if applicable)."
    },
  ]).then((response) => {
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name: response.newEmployeeFirstName,
        last_name: response.newEmployeeLastName,
        role_id: response.newEmployeeRole,
        manager_id: response.newEmployeeManager
      },
      (err) => {
        if(err) throw err;
        console.log("New Employee was Added.");
        viewEmployees();
      }
      );
  });
}

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if(err) throw err;
    console.table(res);

    inintialize();
  })
}

const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if(err) throw err;
    console.table(res);

    inintialize();
  })
}

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if(err) throw err;
    console.table(res);

    inintialize();
  })
}

const updateRole = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "employeeIdNumber",
    message: "To Update a Role enter the Employee's ID Number."
    },
    {
    type: "input",
    name: "updatedRoleId",
    message: "Enter the Role ID number of the updated Role."
    }
  ]).then((response) => {
    connection.query("UPDATE employee SET ? WHERE",
    [
      {
        role_id: response.updateRoleId
      },
      {
        employee_id: response.employeeIdNumber
      }
    ], (err) => {
      if(err) throw err;
      console.log("Employee Role updated.");
      inintialize();
    });
  });
}

const updateManager = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "employeeIdNumber",
    message: "To Update a Manager enter the Employee's ID Number."
    },
    {
    type: "input",
    name: "updatedManagerId",
    message: "Enter the Manager ID number of the updated Manager."
    }
  ]).then((response) => {
    connection.query("UPDATE employee SET ? WHERE",
    [
      {
        manager_id: response.updateManagerId
      },
      {
        employee_id: response.employeeIdNumber
      }
    ], (err) => {
      if(err) throw err;
      console.log("Employee Manager updated.");
      inintialize();
    });
  });
}

const deleteDepartment = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "deleteDepartmentName",
    message: "Enter the name of the Department to be deleted."
    }
  ]).then((response) => {
    connection.query("DELETE FROM department WHERE ?",
    [
      {
        department_name: response.deleteDepartmentName
      }
    ], (err) => {
      if(err) throw err;
      console.log("Department Deleted.");
     viewDepartments();
    });
  });
}

const deleteRole = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "deleteRoleId",
    message: "Enter the Role ID number of the Role to be deleted."
    }
  ]).then((response) => {
    connection.query("DELETE FROM role WHERE ?",
    [
      {
        role_id: response.deleteRoleId
      }
    ], (err) => {
      if(err) throw err;
      console.log("Role Deleted.");
      viewRoles();
    });
  });
}

const deleteEmployee = () => {
  inquirer.prompt([
    {
    type: "input",
    name: "deleteEmployeeId",
    message: "Enter the Employee ID number of the Employee to be deleted."
    }
  ]).then((response) => {
    connection.query("DELETE FROM role WHERE ?",
    [
      {
        employee_id: response.deleteEmployeeId
      }
    ], (err) => {
      if(err) throw err;
      console.log("Employee Deleted.");
      viewEmployees();
    });
  });
}


