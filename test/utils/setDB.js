const User = require("../../model/User")

const cleanDatabaseRecord = async (username) => {
    try{
        await User.deleteOne({username})
    } catch (err){
        console.error(err)
    }
}

const setRefreshToken = async (email, refreshToken) => {
    try{
        const user = await User.findOne({email})
        user.refreshToken = refreshToken
        await user.save()
    } catch (err){
        console.error(err)
    }
}

module.exports = { setRefreshToken, cleanDatabaseRecord }