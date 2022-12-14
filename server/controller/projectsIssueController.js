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
    req.body.members = JSON.parse(req.body?.members)
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
const updateIssue = async (req, res, err) => {
    const _id = req.params?.id
    const updateIssueId = req.body?._id
    req.body.members = typeof(req.body.members) === 'string' ? JSON.parse(req.body?.members) : req.body.members
    req.body.comments = typeof(req.body.comments) === 'string' ? JSON.parse(req.body?.comments) : req.body.comments
    if(req.file?.filename){
        console.log(req.file?.filename)
        req.body.image = req.file?.filename
    }
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
const removeIssue = async (req, res, err) => {
    const _id = req.params?.id
    const deleteIssueId = req.params?.issueId
    if(!_id || !deleteIssueId) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const issues = foundProject.issues
        foundProject.issues = issues.filter(issue => issue._id != deleteIssueId)
        foundProject.issueIncrement = foundProject.issueIncrement - 1
        await foundProject.save()
        return res.status(200).send(foundProject.issues)
    }catch(error){
        console.log(error)
    }
}
const removeComment = async (req, res, err) => {
    const _id = req.params?.id
    const issueId = req.params?.issueId
    const deleteCommentId = req.params?.commentId
    if(!_id || !issueId || !deleteCommentId ) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id})
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const foundIssue = foundProject.issues.find(issue => issue._id === issueId)
        if(!foundIssue) return res.status(400).send({'error': 'issue not found'}) 
        foundIssue.comments = foundIssue.comments.filter(comment => comment._id != deleteCommentId)
        await foundProject.save()
        return res.status(200).send(foundIssue)
    }catch(error){
        console.log(error)
    }
}

module.exports = {getIssues, addIssue, updateIssue, removeIssue, removeComment }