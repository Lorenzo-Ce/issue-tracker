const logErrorConsole = (errorName, errorMessage) => {
    if(!errorName || !errorMessage) {
        console.log("Missing error name or message")
    }
    console.log({errorName, errorMessage})
}

module.exports = logErrorConsole