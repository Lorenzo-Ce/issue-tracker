const User = require('../model/User')
const bcrypt = require('bcrypt')

const registerNewUser = async (req, res) => {
    const {email, username, password} = req.body
    if(!email || !username || !password){
        return res.status(400).send({"error" : `Missing one or more of the required field: Email, password, username`})
    }
    const doubleUser = await User.findOne({
        $or: [
            { 'username': username }, 
            { 'email': email }
        ]
    }).exec()
    if(doubleUser){
        return res.status(409)
                .send({'error' : `${doubleUser.email === email ? 'Email already present in DB' : 'Username already taken'}`})
    }
     try{
            const hashedPsw = await bcrypt.hash(password, 11)
            await User.create ({
                email,
                username,
                password: hashedPsw,
                isAuthenticated: false,
            })
            return res.status(201)
                    .send({
                        'message': `User created`,
                        'username': `${username}`                                    
                    })
        }
        catch(err){
            res.status(500).send({'error' : `${err.message}`})
        }
}

module.exports = {registerNewUser}