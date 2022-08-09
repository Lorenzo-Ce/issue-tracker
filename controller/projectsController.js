const Project = require('../model/Project')
const User = require('../model/User')
const mongoose = require('mongoose')

const addProject = async (req, res, err) => {
    const name = req.body?.name
    const status = req.body?.status
    const roles = req.body?.roles
    const username = req.body?.username
    if(!name || !status || !roles || !username){
       return res.status(400).send({'error' : 'missing one or more required field'})
    }
    try{
        const members = Object.values(roles).flat()
        const newProject = await Project.create({name, status, roles, members})
        const foundUser = await User.findOne({username}).exec()
        if(!foundUser){
            await Project.deleteOne({_id: newProject._id})
            return res.sendStatus(400)
        }  
        foundUser.projects.set(newProject._id, 'Manager') 
        await foundUser.save()
        res.status(201).send(JSON.stringify(newProject))
    }catch(error){
        console.log(error)
    } 
}

const getAllProjects = async (req, res, err) => {
    const { username } = req.body
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
    const status = req.body.status
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    if(!name || !status || ! startDate || ! endDate){
        return res.status(400).send({
            'name' : `${name ? 'ok' : 'missing'}`,
            'status' : `${status ? 'ok' : 'missing'}`,
            'startDate' : `${startDate ? 'ok' : 'missing'}`,
            'endDate' : `${endDate ? 'ok' : 'missing'}`
        })
    }
    const foundProject = await Project.findById({_id}).exec()
    if(!foundProject) return res.sendStatus(404)
    foundProject.name = name
    foundProject.status = status
    foundProject.startDate = startDate
    foundProject.endDate = endDate
    await foundProject.save()
    res.status(200).send(foundProject)
}

const deleteProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.sendStatus(204)
        const projectMembers = await User.find({username: {$in: foundProject.members}})
        await Promise.all(projectMembers.map(async member => {
            member.projects.delete(_id)
            return await member.save()
        })
        )
        const result = await Project.deleteOne({_id})
        if(!result.acknowledged){return res.sendStatus(500)} // Internal Server Issue 
    }catch(error){console.log(error)}
    return res.sendStatus(200)
}

    module.exports = {getAllProjects, addProject, getProject, updateProject, deleteProject}