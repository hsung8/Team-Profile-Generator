const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
let newEmp;

const empType = [
    {
        type: "list",
        message: "Type of employee?",
        name: "employee",
        choices: ["Engineer", "Intern", "[EXIT] Quit adding"]
    }
];

const q = [
    {
        type: "input",
        message: "Name:",
        name: "name"
    },
    {
        type: "input",
        message: "ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Email:",
        name: "email",
        validate: function (email) {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log("Please type a valid email")
                return false;
            }
        }
    }
];


const managerQ = [
    {
        type: "input",
        message: "Office number:",
        name: "number"
    }
];
const engineerQ = [
    {
        type: "input",
        message: "GitHub:",
        name: "github"
    }
];
const internQ = [
    {
        type: "input",
        message: "School:",
        name: "school"
    }
];

async function init() {
    console.log("Input manager information:")
    try {
        const info = await inquirer.prompt(q);
        const managerInfo = await inquirer.prompt(managerQ);
        newEmp = new Manager(info.name, info.id, info.email, managerInfo.number)
        employees.push(newEmp);
        otheremployees();
    } catch (error) {
        console.log(error);
    }
}

async function otheremployees() {
    try {
        const userInput = await inquirer.prompt(empType);
        if (userInput.employee === "Engineer") {
            console.log("Input engineer information:")
            const info = await inquirer.prompt(q);
            const engineerInfo = await inquirer.prompt(engineerQ);
            newEmp = new Engineer(info.name, info.id, info.email, engineerInfo.github);
            employees.push(newEmp);
            otheremployees()
        } else if (userInput.employee === "Intern") {
            console.log("Input intern information:")
            const info = await inquirer.prompt(q);
            const internInfo = await inquirer.prompt(internQ);
            newEmp = new Intern(info.name, info.id, info.email, internInfo.school)
            employees.push(newEmp);
            otheremployees()
        } else if (userInput.employee === "[EXIT] Quit adding") {
            fs.writeFile(outputPath, render(employees), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("You added all of your team members!");
            });
            return
        } 
    } catch (error) {
        console.log(error);
    }
}
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
