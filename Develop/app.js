const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
class teamProfile {
    constructor() {
        this.profile = {
            manager: null,
            engineer: [],
            intern: []
        }
    }

    async getInfo() {
        console.log(`\nPlease type your employee's information:\n`);

        let employee =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "ID: ",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "Name: ",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "Email: ",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "Title: ",
                        name: "role"
                    }
                ]);

        switch (employee.role.toLowerCase()) {
            case 'manager':
                employee = await this.getOfficeNumber(employee);
                break;
            case 'engineer':
                employee = await this.getGithubHandle(employee);
                break;
            case 'intern':
                employee = await this.getSchoolInfo(employee);
                break;
            default:
                break;

        }

        return employee;
    }

    async getOfficeNumber(employee) {
        let manager =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Office Number: ",
                        name: "officeNumber"
                    }
                ])

        employee.officeNumber = await manager.officeNumber;

        return employee;
    }

    async getGithubHandle(employee) {
        let engineer =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "GitHub ID: ",
                        name: "github"
                    }
                ]);

        employee.github = await engineer.github;

        return employee;
    }

    async getSchoolInfo(employee) {
        let intern =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "School: ",
                        name: "school"
                    }
                ]);

        employee.school = intern.school;

        return employee;
    }

    createEmployee(employee) {
        let employeeCreate;
        const { id, name, email } = employee;
        switch (employee.role.toLowerCase()) {
            case 'manager':
                const manager = new Manager(name, id, email, employee.officeNumber);
                employeeCreate = manager;
                break;
            case 'engineer':
                const engineer = new Engineer(name, id, email, employee.github);
                employeeCreate = engineer;
                break;
            case 'intern':
                const intern = new Intern(name, id, email, employee.school);
                employeeCreate = intern;
                break;
            default:
                break;
        }

        return employeeCreate;
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!



    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    createProfile(team) {

        fs.writeFile(outputPath, team, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


        http.createServer(function (req, res) {
            fs.readFile(outputPath, function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });

        }).listen(8080);
    }

    async init() {

    }

}
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const newTeam = new teamProfile();

teamProfile.init();