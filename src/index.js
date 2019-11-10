#!/usr/bin/env node

const cmd = require("node-cmd");
const Promise = require("bluebird");
const minimist = require("minimist");
const commitOptions = require("./commitOptions");
// import commitOptions from './commitOptions';
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
const parsedParameters = minimist(process.argv.slice(2));
console.log(parsedParameters);
let lintCommand =
    typeof parsedParameters.l === "string" ? parsedParameters.l : "node -v"; // -n <componentName> / OPTIONAL
if (lintCommand !== "node -v") console.log(`'1) Linting: ${lintCommand}`);
getAsync(lintCommand).then(() => {
    console.log('2) Checking untracked files');
    getAsync("git diff-files").then(data => {
        if (data && data[0].length > 0) {
            console.log(
                "There were linting errors or there are untracked files, stage them and commit again."
            );
        } else {
            let options = commitOptions(parsedParameters);
            if (options.commitMessage !== undefined) {
                getAsync(`git commit ${options.commitMessage} ${options.otherOptions}`).then(() => {
                    console.log(`3) committing: git commit ${options.commitMessage} ${options.otherOptions}`);
                    if (parsedParameters.major) {
                        getAsync("npm version major").then(() => {
                            console.log("Major version released");
                        });
                    } else if (parsedParameters.minor) {
                        getAsync("npm version minor").then(() => {
                            console.log("Minor version released");
                        });
                    } else {
                        getAsync("npm version patch").then((data) => {
                            console.log("Version updated", data);
                        });
                    }
                });
            } else {
                console.warn("Missing commit message");
            }
        }
    });
});