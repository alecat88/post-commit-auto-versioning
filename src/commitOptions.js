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

    for (var property in parsedParameters) {
        if (parsedParameters.hasOwnProperty(property)) {
            let prefix = "-";
            if (property.length > 1) {
                prefix = "--";
            }
            console.log('property', property);
            commitOptions.otherOptions += `${prefix}${property} ${parsedParameters[property]} `;
            // Do things here
        }
    }

    return commitOptions;
};