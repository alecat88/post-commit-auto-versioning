#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');

const path = '.git/hooks/pre-push';


const version = async() => {
    return await inquirer.prompt([{
        type: 'confirm',
        name: 'overwrite',
        message: 'Prepush file already exist, overwrite?',
        default: false,
        validate: function(value) {
            if (value.length <= 1 && value.length) {
                return true;
            } else {
                return 'Please select the version.';
            }
        }
    }]);
}

const createPrepushFile = () => {
    fs.copyFile('src/prepush/pre-push', '.git/hooks/pre-push', (err) => {
        if (err) throw err;
        console.log('Prepush hook installed on this repository.');
    });
}

try {
    if (fs.existsSync(path)) {
        //file already exists
        console.log('exist');
        version().then((data) => {
            if (data.overwrite) createPrepushFile();
        })
    } else createPrepushFile();
} catch (err) {
    console.error(err)
}