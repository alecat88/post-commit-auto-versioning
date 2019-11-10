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
        commitOptions.commitMessage = commitMessage;
    } else if (commitMessageLong !== undefined) {
        commitOptions.commitMessage = commitMessageLong;
    }

    let parameterNotToConsider = ['m', 'message', '_'];

    for (var property in parsedParameters) {
        if (parsedParameters.hasOwnProperty(property)) {
            if (!parameterNotToConsider.includes(property)) {
                let prefix = "-";
                let value = `"${parsedParameters[property]}"`;
                if (property.length > 1) {
                    prefix = "--";
                    value = "";
                }
                console.log('property6', property);
                commitOptions.otherOptions += `${prefix}${property} ${value} `;
            }
        }
    }

    return commitOptions;
};