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
    // fs.copyFile('src/prepush/pre-push', '.git/hooks/pre-push', (err) => {
    //     if (err) throw err;
    //     console.log('Prepush hook installed on this repository.');
    // });
    const prepushFileContent = `#!/bin/sh
  
CMD = 
# Read user input, assign stdin to keyboard
exec < /dev/tty
echo &&
echo "PREPUSH: Select the update"
echo "1) Patch"
echo "2) Minor"
echo "3) Major"
echo "4) No version change (still push)"
while read -p "Insert the selection? (1/2/3/4): " yn; do
    case $yn in
        [1] ) CMD="npm version patch"; $CMD; wait; echo 'Patch version updated'; exit 0;;
        [2] ) CMD="npm version minor"; $CMD; wait; echo 'Minor version updated'; exit 0;;
        [3] ) CMD="npm version major"; $CMD; wait; echo 'Major version updated'; exit 0;;
        [4] ) echo 'no version updated'; exit 0;;
        * ) echo "Please write a number" && continue;
    esac
done
exec <&-`

    fs.writeFile(".git/hooks/pre-push2", prepushFileContent, function(err) {
        if (err) {
            return console.log(err);
        }
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