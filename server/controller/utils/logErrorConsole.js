const logErrorConsole = (errorName, errorMessage) => {
    if(!errorName || !errorMessage) {
        console.log("Missing error name or message")
        return
    }
    console.log({errorName, errorMessage})
}

module.exports = logErrorConsole