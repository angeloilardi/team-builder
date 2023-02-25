const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];


inquirer
    .prompt([
        {
            type: "iput",
            message: "What is the team manager's name?",
            name: "managerName",
        },
        {
            type: "iput",
            message: "What is the team manager's id?",
            name: "managerId",
        },
        {
            type: "iput",
            message: "What is the team manager's email?",
            name: "managerEmail",
        },
        {
            type: "iput",
            message: "What is the team manager's office number?",
            name: "managerOfficeNumber",
        },
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        team.push(manager);
        promptForNextEmployee();
    })

const promptForNextEmployee = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add another employee? If so, please choose type:",
                choices: ["Engineer", "Intern", "I don't want to add another employee"],
                name: "addEmployee"
            },
        ]).then(response => {
            switch (response.addEmployee) {
                case "Engineer":
                    addEngineerPrompt();
                    break;
                case "Intern":
                    addInternPrompt();
                    break;
                case "I don't want to add another employee":
                    console.log('Your web page will be created now, please look for the team.html file in the output folder');
                    if (!fs.existsSync(OUTPUT_DIR)) {
                        fs.mkdirSync(OUTPUT_DIR);
                    };
                    fs.writeFileSync(outputPath, render(team))
                    break;
                default:
                    break;
            }
        })
};

const addEngineerPrompt = () => {
    inquirer
        .prompt([
            {
                type: "iput",
                message: "What is the engineer's name?",
                name: "engineerName",
            },
            {
                type: "iput",
                message: "What is the engineer's id?",
                name: "engineerId",
            },
            {
                type: "iput",
                message: "What is the engineer's email?",
                name: "engineerEmail",
            },
            {
                type: "iput",
                message: "What is the engineer's GitHub username?",
                name: "engineerGithub",
            },
        ]).then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
            team.push(engineer);
            promptForNextEmployee();
        })
};

const addInternPrompt = () => {
    inquirer
        .prompt([
            {
                type: "iput",
                message: "What is the intern's name?",
                name: "internName",
            },
            {
                type: "iput",
                message: "What is the intern's id?",
                name: "internId",
            },
            {
                type: "iput",
                message: "What is the intern's email?",
                name: "internEmail",
            },
            {
                type: "iput",
                message: "What is the intern's school?",
                name: "internSchool",
            },
        ]).then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            team.push(intern);
            promptForNextEmployee();
        })
};



