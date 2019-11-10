#!/usr/bin/env node

const cmd = require("node-cmd");
const Promise = require("bluebird");
const minimist = require("minimist");
const commitOptions = require("./commitOptions");

const finder = require('find-package-json');
const packageJson = finder().next().value;

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
const parsedParameters = minimist(process.argv.slice(2));
let steps = 1;

//Check lint script
let lintCommand = "node -v"; //Will be replace if lint script is available
if (packageJson["post-commit-auto-versioning"] !== undefined) {
    if (packageJson["post-commit-auto-versioning"]["pre-commit"] !== undefined) {
        lintCommand = packageJson["post-commit-auto-versioning"]["pre-commit"];
    }
}
if (typeof parsedParameters.l === "string") {
    console.log('taken from parameter');
    lintCommand = parsedParameters.l;
}
if (lintCommand !== "node -v") console.log(`'${steps++}) Linting: ${lintCommand}`);

//Start
getAsync(lintCommand).then(() => {
    console.log(`${steps++}) Checking untracked files`);
    getAsync("git diff-files").then(data => {
        if (data && data[0].length > 0) {
            console.log(
                "There were linting errors or there are untracked files, stage them and commit again."
            );
        } else {
            let options = commitOptions(parsedParameters);
            if (options.commitMessage !== undefined) {
                getAsync(`git commit ${options.commitMessage} ${options.otherOptions}`).then(() => {
                    console.log(`${steps++}) committing: git commit ${options.commitMessage} ${options.otherOptions}`);
                    if (parsedParameters.major) {
                        getAsync("npm version major").then((data) => {
                            console.log("Major version released", data[0]);
                        });
                    } else if (parsedParameters.minor) {
                        getAsync("npm version minor").then((data) => {
                            console.log("Minor version released", data[0]);
                        });
                    } else {
                        getAsync("npm version patch").then((data) => {
                            console.log("Version updated", data[0]);
                        });
                    }
                });
            } else {
                console.warn("Missing commit message");
            }
        }
    });
});