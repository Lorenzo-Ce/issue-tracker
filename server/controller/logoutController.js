const User = require('../model/User')

const logOutUser = async (req, res, err) => {
    const refreshToken = req.cookies?.token
    if(!refreshToken){
        return res.sendStatus(205) // refresh no content
    }
    const foundUser = await User.findOne({refreshToken}).exec()
    if(!foundUser){
        res.clearCookie('token', { httpOnly: true })
        return res.sendStatus(204)
    }
    else{ 
        foundUser.refreshToken = ''
        await foundUser.save()
        res.clearCookie('token', { 
            httpOnly: true, 
            sameSite: 'None', 
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, 
        })
        return res.status(204).send({'message': 'successfull logout'})
    }
}

module.exports = { logOutUser }