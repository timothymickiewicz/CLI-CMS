const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const CFonts = require("cfonts");
const dotenv = require("dotenv").config();

// Establishes connection to mysql
let connection = mysql.createConnection({
    multipleStatements: process.env.boolean,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.pw,
    database: process.env.db
});

connection.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
    menu();
});

CFonts.say("CLI-CMS", {
    font: "block",
    align: "left",
    colors: ["blue"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 5,
    space: true,
    maxLength: "0",
    gradient: true,
    independentGradient: false,
    transitionGradient: true,
    env: "node"
});

let menu = () => {
    inquirer
    .prompt({
        type: "list",
        name: "option",
        message: "Menu",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View Employees",
            "View All Employees By Managers",
            "View A Manager's Employees",
            "Update Employee Role",
            "Update Employee's Manager",
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "View Budget By Department"
        ]
    }).then((res) => {
        switch (res.option) {
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View Departments":
                viewDpts();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View All Employees By Managers":
                viewByMngrs();
                break;
            case "View A Manager's Employees":
                viewByMngr();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Update Employee's Manager":
                updateManager();
                break;
            case "Delete Department":
                deleteDpt();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View Budget By Department":
                viewBudget();
                break;
            default: 
                console.log("You Must Choose an Option!");
                menu();
        }
    })
}

// Adds a department to the department table
let addDepartment = () => {
    inquirer
        .prompt([{
            name: "dpt",
            message: "What is the name of this new department?",
        }
        ]).then((res) => {
        connection.query("INSERT INTO department (name) VALUES ('" + res.dpt + "')", (err,result) => {
            if(err){
                console.log("ERROR:"+err.message);
            }
            console.log("new department data added");
            menu();
        });
    })
}

// Adds a role to the role table
let addRole = () => {
    inquirer
    .prompt([
        {
            name: "title",
            message: "What is the title of the new role?"
        },
        {
            name: "salary",
            message: "What is the salary of the new role?"
        },
        {
            name: "dptID",
            message: "What is the department id of the new role?"
        },
    ]).then((res) => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES ('" + res.title + "', " + res.salary + ", " + res.dptID + ")", (err,result) => {
            if(err) throw err;
            console.log("New role data added");
            menu();
        });
    })
}

// Adds an employee to the employee table
let addEmployee = () => {
    inquirer
    .prompt([
        {
            name: "firstName",
            message: "What is the first name of this new employee?"
        },
        {
            name: "lastName",
            message: "What is the last name of this new employee?"
        },
        {
            name: "roleID",
            message: "What is the role id number of this new employee?"
        },
        {
            name: "manID",
            message: "What is the manager's id number for this new employee? Leave this field empty and hit the 'enter' key if this employee is a manager."
        }]
    ).then((res) => {
        // Leaves manager id field to the default of 'null' if employee is a manager
        if (res.manID === "") {
            connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + res.firstName + "', '" + res.lastName + "', '" + res.roleID + "')", (err,result) => {
                if(err) throw err;
                console.log("New employee data added");
                menu();
            });
        }
        // Creates an employee with their associated manager's id number
        else {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + res.firstName + "', '" + res.lastName + "', '" + res.roleID + "', '" + res.manID + "')", (err,result) => {
                if(err) throw err;
                console.log("New employee data added");
                menu();
            });
        }
    })
}

// Views the departments
let viewDpts = () => {
    connection.query('SELECT * FROM department', (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    });
}

// Views the roles
let viewRoles = () => {
    connection.query('SELECT * FROM role', (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    });
}

// Views the employees
let viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err,res) => {
        if(err) throw err;
        console.table(res);
        menu();
    });
}

// Updates the employee's role
let updateRole = () => {
    let employeesFirstLast = [];
    let employees = [];
    let check = null;
    // Getting all employees into a useable array
    connection.query('SELECT * FROM employee', (err,res) => {
        if(err) throw err;
        for (i=0; i<res.length; i++) {
            // Removing default mySQL encompassing object
            employees.push(JSON.parse(JSON.stringify(res[i])));
        }
        // Getting all employees into an array of first and last names
        for (i=0; i<employees.length; i++) {
            employeesFirstLast.push(employees[i].first_name.concat(` ${employees[i].last_name}`));
        }
        return employeesFirstLast;
    })
    inquirer
    .prompt([
        {
            name: "employee",
            message: "Enter the employee that you wish to update.",
        },
        {
            name: "newRole",
            message: "Enter this employee's new role ID.",
        }
    ]).then((res) => {
        for (i=0; i<employeesFirstLast.length; i++) {
            // Comparing what the user entered to the employees pulled from the database, else recursion to let the user choose to try again
            if (res.employee === employeesFirstLast[i]) {
                // Getting first and last names separated from the selected employee
                let first = employeesFirstLast[i].split(' ')[0];
                let second = employeesFirstLast[i].split(' ')[1];
                connection.query(
                    "UPDATE employee SET role_id = " + res.newRole + " WHERE (first_name = '" + first + "' AND last_name = '" + second +"')", 
                    (err, res) => {
                    if (err) throw err;
                        console.log(`Changed ${res.changedRows} row(s)`);
                    }
                );
                check = true;
                menu();
            }
        }
        // Informs the user that there is no existing employee with that name, and asks them if they want to try again.
        if (check != true) {
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "retry",
                        message: "We did not find any employees under that name. Please ensure to spell their name correctly. Do you wish to try again?",
                    }
                ]).then((res) => {
                    if (res.retry === true) {
                        updateRole();
                    } 
                    else {
                        menu();
                    }
                })
        }
    })
}

// Updates the employee's manager id number
let updateManager = () => {
    let employeesFirstLast = [];
    let employees = [];
    let check = null;
    // Getting all employees into a useable array
    connection.query('SELECT * FROM employee', (err,res) => {
        if(err) throw err;
        for (i=0; i<res.length; i++) {
            // Removing default mySQL encompassing object
            employees.push(JSON.parse(JSON.stringify(res[i])));
        }
        // Getting all employees into an array of first and last names
        for (i=0; i<employees.length; i++) {
            employeesFirstLast.push(employees[i].first_name.concat(` ${employees[i].last_name}`));
        }
        return employeesFirstLast;
    })
    inquirer
    .prompt([
        {
            name: "employee",
            message: "Enter the employee that you wish to update.",
        },
        {
            name: "newManID",
            message: "Enter this employee's new manager ID.",
        }
    ]).then((res) => {
        for (i=0; i<employeesFirstLast.length; i++) {
            // Comparing what the user entered to the employees pulled from the database, else recursion to let the user choose to try again
            if (res.employee === employeesFirstLast[i]) {
                // Getting first and last names separated from the selected employee
                let first = employeesFirstLast[i].split(' ')[0];
                let second = employeesFirstLast[i].split(' ')[1];
                connection.query(
                    "UPDATE employee SET manager_id = " + res.newManID + " WHERE (first_name = '" + first + "' AND last_name = '" + second +"')", 
                    (err, res) => {
                    if (err) throw err;
                        console.log(`Changed ${res.changedRows} row(s)`);
                    }
                );
                check = true;
                menu();
            }
        }
        // Informs the user that there is no existing employee with that name, and asks them if they want to try again.
        if (check != true) {
            inquirer
                .prompt([
                    {
                        type: "confirm",
                        name: "retry",
                        message: "We did not find any employees under that name. Please ensure to spell their name correctly. Do you wish to try again?",
                    }
                ]).then((res) => {
                    if (res.retry === true) {
                        updateManager();
                    } 
                    else {
                        menu();
                    }
                })
        }
    })
}

// Views all managers and thier associated employees
let viewByMngrs = () => {
    connection.query(`SELECT CONCAT(m.first_name, ', ', m.last_name) AS Manager, CONCAT(e.first_name, ', ', e.last_name) AS 'Employee' FROM employee e INNER JOIN employee m ON m.id = e.manager_id ORDER BY Manager`, (err,res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        menu();
    })
}

// Views employees of a single manager
let viewByMngr = () => {
    inquirer
    .prompt([
        {
            name: "employees",
            message: "Enter the manager's id number.",
        }
    ]).then((res) => {
        connection.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Employees FROM employee WHERE manager_id = ${res.employees}`, (err,res) => {
            if (err) {
                console.log(err);
            }
                console.table(res);
                menu();
        })
    })
}

// Deletes department and the associated roles/employees
let deleteDpt = () => {
    inquirer
    .prompt([
        {
            name: "dpt",
            message: "Enter the department's id that you want to delete.",
        }
    ]).then((res) => {
        let dpt = res.dpt;
        inquirer
        .prompt([
            {
                type: "confirm",
                name: "proceed",
                message: "Warning, this will remove all employees and roles associated with this department. You may wish to re-assign these employees and/or roles before proceeding. Do you still wish to proceed?",
            }
        ]).then((res) => {
            if (res.proceed === true) {
                connection.query(`DELETE role, department FROM role INNER JOIN department ON department.id = role.department_id WHERE role.department_id = ${dpt}`, (err,res) => {
                    if (err) {
                        console.log(err);
                    }
                        console.log(res);
                        console.log(`Deleted row(s)`);
                        menu();
                })
            }
            else if (res.proceed === false) {
                menu();
            }
        })
    })
}

// Deletes a role
let deleteRole = () => {
    inquirer
    .prompt([
        {
            name: "role",
            message: "Enter the role's id that you want to delete.",
        }
    ]).then((res) => {
        let role = res.role;
        inquirer
        .prompt([
            {
                type: "confirm",
                name: "proceed",
                message: "Warning, this will remove all employees associated with this role. You may wish to re-assign these employees before proceeding. Do you still wish to proceed?",
            }
        ]).then((res) => {
            if (res.proceed === true) {
                connection.query(`DELETE role, employee FROM role INNER JOIN employee ON employee.role_id = role.id WHERE role.id = ${role}`, (err,res) => {
                    if (err) {
                        console.log(err);
                    }
                        console.log(res);
                        console.log(`Deleted row(s)`);
                        menu();
                })
            }
            else if (res.proceed === false) {
                menu();
            }
        })
    })
}

// Deletes an employee
let deleteEmployee = () => {
    inquirer
    .prompt([
        {
            name: "employee",
            message: "Enter the employees's id that you want to delete.",
        }
    ]).then((res) => {
        let employee = res.employee;
        inquirer
        .prompt([
            {
                type: "confirm",
                name: "proceed",
                message: "Warning, if you are deleting a manager then you may want to re-assign their employees before proceeding. Do you still wish to proceed?",
            }
        ]).then((res) => {
            if (res.proceed === true) {
                connection.query(`DELETE employee FROM employee WHERE employee.id = ${employee}`, (err,res) => {
                    if (err) {
                        console.log(err);
                    }
                        console.log(res);
                        console.log(`Deleted row(s)`);
                        menu();
                })
            }
            else if (res.proceed === false) {
                menu();
            }
        })
    })
}

// Gives a combined salary expense for a department
let viewBudget = () => {
    inquirer
    .prompt([
        {
            name: "dpt",
            message: "Enter the department's id to get a combined employee salary report.",
        }
    ]).then((res) => {
        connection.query(`SELECT count(employee.role_id) AS count FROM employee WHERE employee.role_id = ${res.dpt}; SELECT role.salary FROM role WHERE role.id = ${res.dpt}; SELECT department.name FROM department WHERE department.id = ${res.dpt}`, (err,res) => {
            if (err) {
                console.log(err);
            }
            let budget = res[1][0].salary * res[0][0].count;
            let department = JSON.parse(JSON.stringify(res[2][0].name));
            console.table(department + " " + budget);
            menu();
        })
    })
}