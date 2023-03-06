const { logEvent } = require("./logHandler")


const errorHandler = (err, req, res, next) => {
    //logEvent.error(`${err.name}\t ${err.message}`)
    res.status(500).send(err.message)
}

module.exports = errorHandler