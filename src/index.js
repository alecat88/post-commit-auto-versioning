const cmd = require("node-cmd");
const Promise = require("bluebird");
const minimist = require("minimist");

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
const parsedParameters = minimist(process.argv.slice(2));

let lintCommand =
    typeof parsedParameters.l === "string" ? parsedParameters.l : "node -v"; // -n <componentName> / OPTIONAL
console.log(lintCommand);
getAsync(lintCommand).then(() => {
    getAsync("git diff-files").then(data => {
        if (data && data[0].length > 0) {
            console.log("There were linting errors or there are untracked files, stage them and commit again.");
        } else {
            let commitMessage =
                typeof parsedParameters.m === "string" ? parsedParameters.m : undefined; // -n <componentName> / OPTIONAL
            if (commitMessage !== undefined) {
                getAsync(`git commit -m "${commitMessage}"`).then(() => {
                    getAsync("npm version patch").then(() => {
                        getAsync("git add package.json").then(() => {
                            console.log("version updated");
                        });
                    });
                });
            } else {
                console.warn("Missing commit message");
            }
        }
    });
});