const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const cFonts = require("cfonts");

// Establishes connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "company_db"
});

connection.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
 });
  
// connection.end((err) => {});

inquirer
.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
        "View Company",
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "View Employees By Manager",
        "Update Employee Role",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "View Budget By Department"
    ]
}).then((res) => {
    switch (res.option) {
        case "View Company":
            console.log("View Company");
            viewCompany();
            break;
        case "Add Department":
            console.log("Add Department, success");
            addDepartment();
            break;
        case "Add Role":
            console.log("Add Role");
            addRole();
            break;
        case "Add Employee":
            console.log("Add Employee");
            addEmployee();
            break;
        case "View Departments":
            console.log("View Department");
            viewDpts();
            break;
        case "View Roles":
            console.log("View Role");
            viewRoles();
            break;
        case "View Employees":
            console.log("View Employee");
            viewEmployees();
            break;
        case "View Employees By Manager":
            console.log("View Employees By Manager");

            break;
        case "Update Employee Role":
            console.log("Update Employee Role");
            updateRole();
            break;
        case "Delete Department":
            console.log("Delete Department");

            break;
        case "Delete Role":
            console.log("Delete Role");

            break;
        case "Delete Employee":
            console.log("Delete Employee");

            break;
        case "View Budget By Department":
            console.log("View Budget By Department");

            break;
        default: 
            console.log("You Must Choose an Option!");
    }
})

// Adds a department to the department table
let addDepartment = () => {
    inquirer
        .prompt([{
            name: "dpt",
            message: "What is the name of this new department?",
        },
        {
            name: "dptID",
            message: "What is the id for this new department?",
        }
        ]).then((res) => {
        let query = "Insert into department (name, dptid) VALUES ('" + res.dpt + "', " + res.dptID + ")";
        connection.query(query, (err,result) => {
            if(err){
                console.log("ERROR:"+err.message);
            }
            else{
                console.log("new department data added");
            }
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
        {
            name: "roleID",
            message: "What is the role id of the new role?"
        }]
    ).then((res) => {
        console.log(res);
        let query = "Insert into role (title, salary, department_id, role_id) VALUES ('" + res.title + "', " + res.salary + ", " + res.dptID + ", " + res.roleID + ")";
        console.log(query);
        connection.query(query, (err,result) => {
            if(err){
                console.log("ERROR:"+err.message);
            }
            else{
                console.log("new role data added");
            }
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
            message: "What is the manager's id number of this new employee?"
        }]
    ).then((res) => {
        connection.query("Insert into employee (first_name, last_name, role_id, manager_id) VALUES ('" + res.firstName + "', '" + res.lastName + "', '" + res.roleID + "', '" + res.manID + "')", (err,result) => {
            if(err){
                console.log("ERROR:"+err.message);
            }
            else{
                console.log("new employee data added");
            }
        });
    })
}

// Views the departments
let viewDpts = () => {
    connection.query('SELECT * FROM department', (err,res) => {
        if(err) throw err;
        console.table(res);
    });
}

// Views the roles
let viewRoles = () => {
    connection.query('SELECT * FROM role', (err,res) => {
        if(err) throw err;
        console.table(res);
    });
}

// Views the employees
let viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err,res) => {
        if(err) throw err;
        console.table(res);
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
            // Comparing what the user entered to the employees in the database, else recursion to try again
            if (res.employee === employeesFirstLast[i]) {
                // Getting first and last names separated from the selected employee
                let first = employeesFirstLast[i].split(' ')[0];
                let second = employeesFirstLast[i].split(' ')[1];
                connection.query(
                    "UPDATE employee SET role_id = " + res.newRole + " WHERE (first_name = '" + first + "' AND last_name = '" + second+"')", 
                    (err, res) => {
                    if (err) throw err;
                
                    console.log(`Changed ${res.changedRows} row(s)`);
                    }
                );
            }
            else {
                check = false;
            }
        }
        if (check === false) {
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
                })
        }
    })
}

// Views all of the company
let viewCompany = () => {
    // Getting info from all of the 
    connection.query('SELECT role.title FROM role INNER JOIN employee ON department_id=role_id;', (err,res) => {
        if(err) throw err;
        console.table(res);
    });
}
