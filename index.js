const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// initializes the array containing objects for the employees
const team = [];

//validation for email address, found help on this page https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
const validateEmail = email => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return 'Please enter a valid email address'
    } return true;

};

// validation for numbers
const validateNumber = number => {
    if (isNaN(number)) {
        return "Enter a valid number"
    }
    return true
};

// validation for empty strings
const validateString = string => {
    if (!string.trim().length) {
        return "Please make sure you enter a value"
    }
    return true
}

// manager's questions prompts
inquirer
    .prompt([
        {
            type: "iput",
            message: "What is the team manager's name?",
            name: "managerName",
            validate: validateString
        },
        {
            type: "input",
            message: "What is the team manager's id?",
            name: "managerId",
            validate: validateNumber
        },
        {
            type: "iput",
            message: "What is the team manager's email?",
            name: "managerEmail",
            validate: validateEmail

        },
        {
            type: "input",
            message: "What is the team manager's office number?",
            name: "managerOfficeNumber",
            validate: validateNumber
        },
    ]).then(response => {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        team.push(manager);
        promptForNextEmployee();
    })

// add employee choice prompt
const promptForNextEmployee = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to add another employee? If so, please choose type:",
                choices: ["Engineer", "Intern", "No, I don't want to add another employee"],
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
                case "No, I don't want to add another employee":
                    console.log('Your web page will be created now, please look for the team.html file in the output folder');
                    // creates output folder it it doesn't exist
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

// engineer's questions prompts
const addEngineerPrompt = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "engineerName",
                validate: validateString
            },
            {
                type: "input",
                message: "What is the engineer's id?",
                name: "engineerId",
                validate: validateNumber
            },
            {
                type: "input",
                message: "What is the engineer's email?",
                name: "engineerEmail",
                validate: validateEmail
            },
            {
                type: "input",
                message: "What is the engineer's GitHub username?",
                name: "engineerGithub",
                validate: validateString
            },
        ]).then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
            team.push(engineer);
            promptForNextEmployee();
        })
};

// intern's questions prompts
const addInternPrompt = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "internName",
                validate: validateString
            },
            {
                type: "input",
                message: "What is the intern's id?",
                name: "internId",
                validate: validateNumber
            },
            {
                type: "input",
                message: "What is the intern's email?",
                name: "internEmail",
                validate: validateEmail
            },
            {
                type: "input",
                message: "What is the intern's school?",
                name: "internSchool",
                validate: validateString
            },
        ]).then(response => {
            const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            team.push(intern);
            promptForNextEmployee();
        })
};



