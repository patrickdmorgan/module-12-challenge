# SQL Challenge: Employee Tracker

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Walkthrough video

## User Story
```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Accepted Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

# Software Used
- mySQL
- node.Js
- console.table
- inquirer
- Javascript

## Installation
1. Clone from GitHub
2. Open project directory, then npm install to install all required dependencies 

## Usage
1. install npm init -y to create a new .json file
2. npm i 
3. npm i mysql
4. npm i inquirer
5. npm i console.table
6. run .sql file in mySQL workbench before running server.js so the tables can render properly 
7. run node server.js
8. make sure server.js is connected to SQL before continuing
9. run through prompts as needed

## Repository
https://github.com/patrickdmorgan/module-12-challenge

## Sources

https://www.stackoverflow.com
Chris B- Central tutor support GW schools

video hosting:
https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide

how to screen record on mac book: 
https://youtu.be/BK6xMWFW1-E

how to share a video: 
https://youtu.be/6LMZxKG-qW0




