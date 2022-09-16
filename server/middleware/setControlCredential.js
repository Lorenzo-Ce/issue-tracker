const allowedDomains = require("../config/allowedDomains")

const setControlCredentials = (req, res, next) => {
    const origin = req.headers.origin
    if(allowedDomains.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next()
}

module.exports = setControlCredentials