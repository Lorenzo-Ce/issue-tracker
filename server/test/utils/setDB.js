const jwt = require('jsonwebtoken')
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

const createProject = async (username, projectName, projectStatus, projectRoles) => {
    const members = Object.values(projectRoles).flat()
    try{
        const newProject = await Project.create({
            name : projectName, 
            status: projectStatus, 
            roles: projectRoles,
            members
        })
    const foundUser = await User.findOne({username}).exec()
    if(!foundUser){
        await Project.deleteOne({_id: newProject._id})
        throw new Error('Project deleted, not added to user')
    }  
    foundUser.projects.set(newProject._id, 'Lead') 
    await foundUser.save()
    return newProject._id
    }catch(error){
        console.error(error)
    } 
}

const deleteProject = async (name) => {
    try{
        await Project.deleteOne({name})
    } catch (err){
        console.error(err)
    }
}

const addProjectIssue = async (projectName, issueData) => {
    try{
        const foundProject = Project.findOneAndUpdate({name: projectName}, {$push: {issues : issueData}} ).exec()
        if(!foundProject) throw new Error('Project Not Found')
        foundProject.issues        
    }catch(err){
        console.error(err)
    }
}

const setRefreshToken = async (username, refreshToken) => {
    try{
        const user = await User.findOne({username})
        user.refreshToken = refreshToken
        await user.save()
    } catch (err){
        console.error(err)
    }
}

const setAccessToken = async (username) => {
    try{
        const accessToken = jwt.sign(
            {username}, 
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn: '10m'}
        )
        return accessToken
    }catch(err){
        console.error(err)
    }
}

module.exports = { 
    createUser, 
    deleteUser,
    createProject, 
    deleteProject, 
    addProjectIssue,
    setRefreshToken,
    setAccessToken
}