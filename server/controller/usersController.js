const User = require('../model/User')

const getAllUsers = async (req, res, err) => {
    const usersList = await User.find({}).select('username')
    if(!usersList) return res.sendStatus(204)
    return res.status(200).send({usersList})
}

module.exports = {getAllUsers}