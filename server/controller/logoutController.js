const User = require('../model/User')
const logErrorConsole = require('./utils/logErrorConsole')

const logOutUser = async (req, res, next) => {
    const refreshToken = req.cookies?.token
    if(!refreshToken){
        return res.sendStatus(205) // refresh no content
    }
    try{
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
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

module.exports = { logOutUser }