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

            break;
        case "Add Employee":
            console.log("Add Employee");

            break;
        case "View Department":
            console.log("View Department");

            break;
        case "View Role":
            console.log("View Role");

            break;
        case "View Employee":
            console.log("View Employee");

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

let addDepartment = () => {
    inquirer
    .prompt({
        name: "dpt",
        message: "What is the name of the new department?",
    }).then((res) => {
        connection.query("Insert into department (name) VALUES ('" + res.dpt +"')", (err,result) => {
            if(err){
                console.log("ERROR:"+err.message);
            }
            else{
                console.log("new column added");
            }
        });
    })
}