const Project = require('../model/Project')
const User = require('../model/User')
const mongoose = require('mongoose')
const cleanUserProjectRole = require('./utils/cleanUserProjectRole')
const addUserProjectRole = require('./utils/addUserProjectRole')


const addProject = async (req, res, err) => {
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
            await Project.deleteOne({_id: newProject._id})
            return res.status(400).send({'error' : 'Database error.'})
        }  
        foundUser.projects.set(newProject._id, 'Lead') 
        await foundUser.save()
        const newMembers = await User.find({username: {$in: roles['Member']}})
        await Promise.allSettled(
            newMembers.map(member =>
                addUserProjectRole(member, newProject._id, 'Member')
        )) 
        return res.status(201).send(JSON.stringify(newProject))
    }catch(error){
        console.log(error)
        //TODO: handle errors with middleware
    } 
}

const getAllProjects = async (req, res, err) => {
    const username = req?.username
    if(!username) return res.status(400).send({'error':'Missing username required field'})
    try{
        const matchedUser = await User.findOne({ username }).exec()
        if(!matchedUser) return res.sendStatus(400)
        const ids= Array.from(matchedUser.projects.keys())
        const objId = ids.map(id => mongoose.Types.ObjectId(id))
        const result = await Project.aggregate([{
            $match: {
                _id : {$in: objId} 
            }
        }])
        if(result.length === 0){
            return res.status(204).send({})
        }
        else{
            const sendResult = JSON.stringify(result)
            return res.status(200).send(sendResult)
        }
    }catch(error){
        console.log(error)
    }
}

// gets and deletes single projects

const getProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id'})
    const foundProject = await Project.findById({_id}).exec()
    if(!foundProject) return res.sendStatus(404)
    const project = JSON.stringify(foundProject)
    return res.status(200).send(project)
}

const updateProject = async (req, res, err) => {
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
    //TODO add a function to DRY the code in update and delete
    await foundProject.save()
    const [membersToRemove, membersToAdd] = await Promise.all([
        User.find({username: {$in: membersExcluded}}),
        User.find({username: {$in: membersAdded}})
    ])
    await Promise.all(membersToRemove.map(member =>
        cleanUserProjectRole(member, _id)
    ))
    await Promise.all(membersToAdd.map(member =>
        addUserProjectRole(member, _id, 'Member')
    ))

    res.status(200).send(foundProject)
}

const deleteProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.sendStatus(204)
        const projectMembers = await User.find({username: {$in: foundProject.members}})
        await Promise.all(projectMembers.map(member => 
            cleanUserProjectRole(member, _id)
        ))
        const result = await Project.deleteOne({_id})
        if(!result.acknowledged){return res.sendStatus(500)} // Internal Server Issue 
    }catch(error){console.log(error)}
    return res.sendStatus(200)
}

    module.exports = {getAllProjects, addProject, getProject, updateProject, deleteProject}