const User = require('../model/User')

const logOutUser = async (req, res, err) => {
    const refreshToken = req.cookies.token
    if(!refreshToken){
        return res.status(400).send({'error':'There is a problem. Try to login again'})
    }
    const foundUser = await User.findOne({refreshToken}).exec()
    foundUser.refreshToken = ''
    await foundUser.save()
    res.status(200).send({'message': 'successfull logout'})
}

module.exports = { logOutUser }