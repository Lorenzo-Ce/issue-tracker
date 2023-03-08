const Project = require('../model/Project')
const User = require('../model/User')
const mongoose = require('mongoose')
const logErrorConsole = require('./utils/logErrorConsole')

const addProject = async (req, res, next) => {
    const name = req.body?.name
    const memberList = req.body?.members
    const username = req.username
    if(!name || !memberList || !username){
       return res.status(400).send({'error' : 'missing one or more required field'})
    }
    try{
        const roles = {
            'Lead': [username],
            'Member': memberList}
        const members = [username, ...memberList]
        const project = {...req.body, roles, members}
        const [newProject, foundUser] = await Promise.all([
            Project.create(project), 
            User.findOne({username}).exec()
        ])
        if(!foundUser || !newProject){
            await Project.deleteOne({_id: newProject._id}).exec()
            return res.status(400).send({'error' : 'Database error.'})
        }  
        foundUser.projects.set(newProject._id, 'Lead') 
        await foundUser.save()

        const projectIdField = `projects.${newProject._id}`
        await User.updateMany({
                username: {$in: roles['Member']}}, 
                {
                    $set: {[projectIdField] : 'Member'}
                }
        ).exec()

        return res.status(201).send(JSON.stringify(newProject))
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    } 
}

const getAllProjects = async (req, res, next) => {
    const username = req?.username
    if(!username) return res.status(400).send({'error':'Missing username required field'})
    try{
        const matchedUser = await User.findOne({ username }).exec()
        if(!matchedUser) return res.sendStatus(400)
        const ids= Array.from(matchedUser.projects.keys())
        const userProjectsIds = ids.map(id => mongoose.Types.ObjectId(id))
        const userProjects = await Project.find({
                _id : {$in: userProjectsIds} 
            }
        )
        if(userProjects.length === 0){
            return res.status(204).send({})
        }
        else{
            const formatUserProjects = JSON.stringify(userProjects)
            return res.status(200).send(formatUserProjects)
        }
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

// gets and deletes single projects

const getProject = async (req, res, next) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.sendStatus(404)
        return res.status(200).send(foundProject.toObject({getters: true, flattenMaps: true }))
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const updateProject = async (req, res, next) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id'})
    const name = req.body.name
    const description = req.body.description
    const status = req.body.status
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const members = req.body.members
    if(!name || !status || !startDate || !endDate || !members){
        return res.status(400).send({
            'name' : `${name ? 'ok' : 'missing'}`,
            'status' : `${status ? 'ok' : 'missing'}`,
            'startDate' : `${startDate ? 'ok' : 'missing'}`,
            'endDate' : `${endDate ? 'ok' : 'missing'}`,
            'members' : `${members ? 'ok' : 'missing'}`
        })
    }
    try {
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.sendStatus(404)
        const membersExcluded = foundProject.members.filter(member => !members.includes(member))
        const membersAdded = members.filter(member => !foundProject.members.includes(member))
        foundProject.name = name
        foundProject.description = description
        foundProject.status = status
        foundProject.startDate = startDate
        foundProject.endDate = endDate
        foundProject.members = members
        await foundProject.save()
        const projectIdField = `projects.${_id}`
        await User.updateMany({username: {$in: membersExcluded}}, {$unset: {[projectIdField]: ""}}).exec()
        await User.updateMany({username: {$in: membersAdded}}, {$set: {[projectIdField] : 'Member'}}).exec()
        res.status(200).send(foundProject)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)     
    }
}

const deleteProject = async (req, res, next) => {
    const _id = req.params?.id
    const username = req.username
    if(!_id || !username) return res.status(400).send({'error': 'missing id or username'})
    try{
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.sendStatus(204)
        const result = await Project.findByIdAndDelete( { _id },{ rawResult: true } ).exec()
        if(!result.ok) return res.sendStatus(500) // Internal Server Issue 
        const projectIdField = `projects.${_id}`
        await User.updateMany(
            {
                username: {
                    $in: foundProject.members
                }
            }, 
            {
                $unset: { 
                    [projectIdField]: "" 
                }
            }
        ).exec()
        const remainingProjects = await Project.find({
            _id : {
                $ne: mongoose.Types.ObjectId(_id)
            },
            members: {
                $elemMatch: {$eq: username}
            }
        }).exec()

        return res.status(200).send(remainingProjects)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

    module.exports = {getAllProjects, addProject, getProject, updateProject, deleteProject}