module.exports = (parsedParameters) => {
    let commitOptions = {
        otherOptions: "",
        commitMessage: undefined
    };

    let commitMessage =
        typeof parsedParameters.m === "string" ? parsedParameters.m : undefined; // -m <commit message> / OPTIONAL
    let commitMessageLong =
        typeof parsedParameters.message === "string" ? parsedParameters.message : undefined; // --message <commit message> / OPTIONAL
    if (commitMessage !== undefined) {
        commitOptions.commitMessage = `-m "${commitMessage}"`;
    } else if (commitMessageLong !== undefined) {
        commitOptions.commitMessage = `-m "${commitMessageLong}"`;
    }

    let parameterNotToConsider = ['m', 'message', '_', 'major', 'minor', "l"];

    for (var property in parsedParameters) {
        if (parsedParameters.hasOwnProperty(property)) {
            if (!parameterNotToConsider.includes(property)) {
                let prefix = "-";
                let value = parsedParameters[property] === true ? "" : `"${parsedParameters[property]}"`;
                if (property.length > 1) {
                    prefix = "--";
                }
                commitOptions.otherOptions += `${prefix}${property} ${value} `;
            }
        }
    }

    return commitOptions;
};