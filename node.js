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
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "View Employees By Manager",
        "Update Employee Role",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "View Budget By Department"
    ]
}).then((res) => {
    switch (res.option) {
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
        case "View Department":
            console.log("View Department");
            viewDpts();
            break;
        case "View Role":
            console.log("View Role");
            viewRoles();
            break;
        case "View Employee":
            console.log("View Employee");
            viewEmployees();
            break;
        case "View Employees By Manager":
            console.log("View Employees By Manager");

            break;
        case "Update Employee Role":
            console.log("Update Employee Role");

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
    .prompt({
        name: "dpt",
        message: "What is the name of the new department?",
    }).then((res) => {
        connection.query("Insert into department (name) VALUES ('" + res.dpt + "')", (err,result) => {
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
            name: "dptid",
            message: "What is the department id of the new role?"
        }]
    ).then((res) => {
        connection.query("Insert into role (title, salary, department_id) VALUES ('" + res.title + "', '" + res.salary + "', '" + res.dptid +"')", (err,result) => {
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
                console.log("new role data added");
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