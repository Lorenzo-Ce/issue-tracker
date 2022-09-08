const allowedDomains = require("../config/allowedDomains")

const setControlCredentials = (req, res, next) => {
    const origin = req.headers.origin
    if(allowedDomains.includes(origin)){
        res.header('Access-Control-Allow-Origin')
    }
    next()
}

module.exports = setControlCredentials