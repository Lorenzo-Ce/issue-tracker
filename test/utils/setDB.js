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

const createProject = async (username, projectName, projectStatus, projectMembers) => {
        try{
            const newProject = await Project.create({
                name : projectName, 
                status: projectStatus, 
                members: projectMembers
            })
        const result = await User.findOneAndUpdate(
                                {username}, 
                                {$addToSet: {projects : newProject._id}}, 
                                { rawResult: true} 
                            ).exec()
        if(!result.lastErrorObject.updatedExisting){
            await Project.deleteOne({_id: newProject._id})
            throw new Error('Project deleted, not added to user')
        }  
        return newProject._id
    }catch(error){
        console.log(error)
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

module.exports = { 
    createUser, 
    deleteUser,
    createProject, 
    deleteProject, 
    setRefreshToken 
}