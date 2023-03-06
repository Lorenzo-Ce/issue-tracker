const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const logErrorConsole = require('./utils/logErrorConsole')

const loginUser = async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).send({
            'email' : `${email ? 'Ok' : 'Email Required'}`,
            'password': `${password ? 'Ok' : 'Password Required'}`
        })
    }
    try{
        const matchedUser = await User.findOne({email : email}).exec()
        if(!matchedUser) return res.status(400).send({'error' : 'You have entered an invalid email or password'})
        
        const result = await bcrypt.compare(password, matchedUser.password)
        if(!result) return  res.status(403).send({'error' : 'You have entered an invalid email or password'})
        const accessToken = jwt.sign({
            'username' : matchedUser.username,
            },
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn: '60m'}
        )
        const refreshToken = jwt.sign({
            'username' : matchedUser.username,
            },
            process.env.SECRET_REFRESH_TOKEN,
            {expiresIn: '1d'}
        )
        matchedUser.refreshToken = refreshToken
        await matchedUser.save()
        //**** Localhost works with secure true sameSite: none. ****//
        res.cookie(
            'token', refreshToken, 
            { httpOnly: true, 
                sameSite: 'None', 
                secure: true,
                maxAge: 24 * 60 * 60 * 1000, 
            }
        )
        res.status(200).send({
            'message' : 'Successfull Login', 
            'accessToken' : accessToken,
            'username':  matchedUser.username
        })
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

module.exports = { loginUser }