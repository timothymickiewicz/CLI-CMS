# CLI-CMS

## Demonstration
![Gif](assets/media/CLI-CMS.gif)

 
## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Use](#use)
* [Licensing](#licensing)
* [Contributors](#contributors)
* [Contributing](#contributing)
* [Tests](#tests)
* [Github](#github) 

## Description
A NodeJS application that allows the user to create an employee database with departments, roles, managers, and salaries. 
 
## Installation
1. Go to [https://github.com/timothymickiewicz/CLI-CMS] and clone this repository.
2. Open terminal and paste the clone URL into the location where you want this repository.
3. Open this folder in your code editor of choice and replace the `process.env` code with your database connection credentials on lines 9-14.
4. Run `npm i` in your terminal to install dependancies. 
5. Copy the schema data from this cloned folder and paste it into your active MySQL workbench. Execute the script to build out your database. You can populate with the seed file's data to practice using the different menu options. Just copy and paste the seed file's code underneath the schema code in your workbench and then execute.
6. Open the command line interface by entering `node server` from your terminal.
7. Navigate through the menu and add, update, or delete employees from your database.
8. Kill the server's connection at any time, or when you are finished, by entering the 'control' and 'c' keys simultaneously while in the terminal.

## Use
The intended use of this application is to create an employee database for the user's company that can be updated as the company grows or changes, or as employee's roles grow or change.
 
## Licensing
![Badge](https://img.shields.io/static/v1?label=License&message=MIT&color=<COLOR>?style=plastic)
 
## Contributors
Timothy Mickiewicz
* (shields.io) 
* (contributor-covenant.org)
 
## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)</br>
Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.</br>
https://www.contributor-covenant.org/version/2/0/code_of_conduct/
 
## Tests
To run tests enter `npm run test` in the terminal
 
## Contact
![Github Profile Picture](https://avatars3.githubusercontent.com/u/58575568?v=4)</br>
timothy.mickiewicz@gmail.com