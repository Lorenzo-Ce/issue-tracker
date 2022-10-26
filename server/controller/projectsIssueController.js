const Project = require('../model/Project')
const User = require('../model/User')
const mongoose = require('mongoose')
const uniqid = require('uniqid');

const getIssues = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.sendStatus(400)
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const issues = foundProject.issues
        res.status(200).send(issues)
    }catch(error){
        console.log(error)
    }
}

const addIssue = async (req, res, next) => {
    const projectId = req?.params?.id
    const name = req?.body?.name
    const label = req?.body?.label
    const priority = req?.body?.priority
    if(!projectId || !name || !label || !priority){
        return res.status(400).send({
            'error' : 'one or more required fields are missing'
        })
    }
    const members = JSON.parse(req.body?.members)
    const issueCount = `${label.toLowerCase()}Count`
    req.body.members = members
    req.body.comments = JSON.parse(req.body?.comments)
    req.body.image = req.file?.filename
    req.body.author = req.username
    req.body._id= uniqid() 
    try{
        const updatedProject = await Project.findOneAndUpdate( {_id: projectId}, 
            {
                '$push': {issues: req.body},
                '$inc': {
                    issueIncrement: 1,
                    [issueCount]: 1
                },
            },
            {
                new: true,
                rawResult: true
            }
        ).exec()
        if(!updatedProject.ok) return res.sendStatus(500)
        //TODO: add to User Model assigned fields and created fields
        return res.sendStatus(201)
    } catch(error){
        console.log(error)
        next(error)
    }
}
const removeIssue = async (req, res, err) => {
    const _id = req.params?.id
    const deleteIssueId = req.body?._id
    if(!_id || !deleteIssueId) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const issues = [...foundProject.issues]
        foundProject.issues = issues.filter(issue => issue._id != deleteIssueId)
        await foundProject.save()
        return res.sendStatus(200)
    }catch(error){
        console.log(error)
    }
}
const updateIssue = async (req, res, err) => {
    const _id = req.params?.id
    const updateIssueId = req.body?._id
    if(!_id || !updateIssueId || updateIssueId === '') return res.status(400).send({'error' : 'one or more required fields are missing'})
    try{
        const updatedProject = await Project.findOneAndUpdate({
            _id,
            'issues._id': updateIssueId
        },
        {
            $set: {'issues.$': req.body }
        },
        {
            new: true,
            rawResult: true,
        }
        ).exec()
        if(!updatedProject.ok) return res.status(400).send({'error': 'project not found'})
        const updatedIssues = updatedProject.value?.issues
        return res.status(200).send({issues: updatedIssues})
    }catch(error){
        console.log(error)
    }
}

module.exports = {getIssues, addIssue, removeIssue, updateIssue}