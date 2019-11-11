#!/usr/bin/env node

const inquirer = require('inquirer');
const cmd = require("node-cmd");


const version = async() => {
    return await inquirer.prompt([{
        type: 'checkbox',
        name: 'version',
        message: 'Select the version: ',
        choices: ['patch', 'minor', 'major'],
        default: ['patch'],
        validate: function(value) {
            if (value.length <= 1 && value.length) {
                return true;
            } else {
                return 'Please select the version.';
            }
        }
    }]);
}

// console.log(version);
version().then((data) => {
    cmd.run(`npm version ${data.version}`)
    console.log(data);
})