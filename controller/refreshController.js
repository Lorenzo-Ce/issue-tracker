const jwt = require('jsonwebtoken');
const User = require('../model/User')

const updateRefreshToken = async (req, res, err) => {
    const refreshToken = req.cookies?.token
    if(!refreshToken){
        return res.status(403).send({"error":"There is a problem with your authentication. Try to login again"})
    }
    const matchedUser = await User.findOne({refreshToken}).exec()
    if(!matchedUser){
        return res.status(403).send({"error":"There is a problem with your authentication. Try to login again"})
    }
    jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESH_TOKEN,
        function (err, decoded) {
            if(err) return res.sendStatus(403)
            const newAccessToken = jwt.sign({
                'email' : decoded.email
                },
                process.env.SECRET_REFRESH_TOKEN,
                {expiresIn: '20m'}
            )
        res.send({"accessToken" : newAccessToken})
        }
    )
    
}

module.exports = { updateRefreshToken }