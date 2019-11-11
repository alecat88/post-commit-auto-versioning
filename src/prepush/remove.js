#!/usr/bin/env node

const fs = require('fs');

const path = '.git/hooks/pre-push';


// const createPrepushFile = () => {
//     fs.copyFile('src/prepush/pre-push', '.git/hooks/pre-push', (err) => {
//         if (err) throw err;
//         console.log('Prepush hook installed on this repository.');
//     });
// }

try {
    if (fs.existsSync(path)) {
        try {
            fs.unlinkSync(path)
                //file removed
            console.log('Prepush removed');
        } catch (err) {
            console.error(err)
        }
    } else console.log('Prepush was already removed');
} catch (err) {
    console.error(err)
}