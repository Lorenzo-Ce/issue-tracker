const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const loginUser = async (req, res, err) => {
    const {email, password} = req.body
    if(!email && !password){
        return res.status(400)
            .send({
                'email' : `${email ? 'Ok' : 'Email Required'}`,
                'password': `${password ? 'Ok' : 'Password Required'}`
            })
    }
    try{
        const matchedUser = await User.findOne({email : email}).exec()
        if(!matchedUser) {return res.status(400).send({'error' : 'You have entered an invalid email or password'})}
        
        const result = await bcrypt.compare(password, matchedUser.password)
        if(!result) return  res.status(403).send({'error' : 'You have entered an invalid email or password'})
        const accessToken = jwt.sign({
            'username' : matchedUser.username,
            },
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn: '20m'}
        )
        const refreshToken = jwt.sign({
            'username' : matchedUser.username,
            },
            process.env.SECRET_REFRESH_TOKEN,
            {expiresIn: '1d'}
        )
        matchedUser.refreshToken = refreshToken
        await matchedUser.save()
        //**** secure flag for https To Add in prod. ****//
        res.cookie(
            'token', refreshToken, 
            { httpOnly: true, maxAge: 24 * 3600000 }
        )
        res.status(200).send({
            'message' : 'Successfull Login', 
            'accessToken' : accessToken
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = { loginUser }