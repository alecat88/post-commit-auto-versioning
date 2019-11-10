module.exports = (parsedParameters) => {
    let commitOptions = {
        otherOptions: ""
    };

    let commitMessage =
        typeof parsedParameters.m === "string" ? parsedParameters.m : undefined; // -m <commit message> / OPTIONAL
    let commitMessageLong =
        typeof parsedParameters.message === "string" ? parsedParameters.message : undefined; // --message <commit message> / OPTIONAL
    if (commitMessage !== undefined) {
        commitOptions.commitMessage = commitMessage;
    } else if (commitMessageLong !== undefined) {
        commitOptions.commitMessage = commitMessageLong;
    }

    let parameterNotToConsider = ['m', 'message', '_'];

    for (var property in parsedParameters) {
        if (parsedParameters.hasOwnProperty(property)) {
            if (!parameterNotToConsider.includes(property)) {
                let prefix = "-";
                if (property.length > 1) {
                    prefix = "--";
                }
                console.log('property3', property);
                commitOptions.otherOptions += `${prefix}${property} "${parsedParameters[property]}"`;
            }
        }
    }

    return commitOptions;
};