const User = require("../../model/User")
const Project = require('../../model/Project')
const createUser = async (username, email, password) => {
    try{
        await User.create({username, email, password})
    } catch (err){
        console.error(err)
    }
}

const deleteUser = async (username) => {
    try{
        await User.deleteOne({username})
    } catch (err){
        console.error(err)
    }
}

const deleteProject = async (name) => {
    try{
        await Project.deleteOne({name})
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

module.exports = { createUser, deleteUser, deleteProject, setRefreshToken }