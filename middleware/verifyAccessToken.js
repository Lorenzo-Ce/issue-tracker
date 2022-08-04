const jwt = require('jsonwebtoken')

const verifyAccessToken = (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization && !authorization.startsWith('Bearer ')) return res.sendStatus(401)
    const accessToken = authorization.split(' ')[1]
    jwt.verify(
        accessToken,
        process.env.SECRET_ACCESS_TOKEN,
        function (err, decoded){
            if(err) return res.sendStatus(403)
            req.username = decoded.username
            next()
        }
    )
}

module.exports = { verifyAccessToken }