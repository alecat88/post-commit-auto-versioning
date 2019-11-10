#!/usr/bin/env node

const cmd = require("node-cmd");
const Promise = require("bluebird");
const minimist = require("minimist");

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
const parsedParameters = minimist(process.argv.slice(2));
console.log(parsedParameters);
let lintCommand =
    typeof parsedParameters.l === "string" ? parsedParameters.l : "node -v"; // -n <componentName> / OPTIONAL
console.log(lintCommand);
getAsync(lintCommand).then(() => {
    console.log('1) Lint done');
    getAsync("git diff-files").then(data => {
        console.log('2) Check untracked files');
        if (data && data[0].length > 0) {
            console.log(
                "There were linting errors or there are untracked files, stage them and commit again."
            );
        } else {
            let commitMessage =
                typeof parsedParameters.m === "string" ? parsedParameters.m : undefined; // -n <componentName> / OPTIONAL
            if (commitMessage !== undefined) {
                getAsync(`git commit -m "${commitMessage}"`).then(() => {
                    console.log('3) committing');
                    if (parsedParameters.major) {
                        getAsync("npm version major").then(() => {
                            console.log("Major version released");
                        });
                    } else if (parsedParameters.minor) {
                        getAsync("npm version minor").then(() => {
                            console.log("Minor version released");
                        });
                    } else {
                        getAsync("npm version patch").then(() => {
                            console.log("version updated");
                        });
                    }
                });
            } else {
                console.warn("Missing commit message");
            }
        }
    });
});