module.exports = (parsedParameters) => {
    let commitOptions = {};
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
            console.log('property', property);
            // Do things here
        }
    }

    return commitOptions;
};