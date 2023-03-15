const mongoose = require('mongoose')
const Project = require('../model/Project')
const User = require('../model/User')
const uniqid = require('uniqid');
const logErrorConsole = require('./utils/logErrorConsole');
const fs = require('fs');
const path = require('path');

const getUserIssues = async (req, res, next) => {
    const username = req?.username
    if(!username) return res.status(400).send({'error': 'username missing'})
    try{
        const foundUser = await User.findOne({username}).exec()
        if(!foundUser) return res.status(400).send({'error': 'user not found'})
        const projects = foundUser.projects
        const projectsIds = [...projects.keys()].map(ids => mongoose.Types.ObjectId(ids))
        if(projectsIds.length === 0) return res.sendStatus(204)
        const issuesList = await Project.aggregate([
            { 
                $match: { _id: {$in: projectsIds} } 
            },
            { 
                $addFields: { "issues.projectId": { $toString: "$_id"} }
            },                    
            {   
                $group: { 
                    _id: null,
                    issues: { $push: "$issues" }
                }
            },
            {
                $project: {
                    issues:{    
                        $reduce: {
                            input: "$issues",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", '$$this']}}, 
                }}
            },
            {
                $project: {
                    issues:{    
                        $filter: {
                            input: "$issues",
                            as: "issue",
                            cond: { $eq: ["$$issue.author",username]}} 
                }}
            }
        ]).exec()
        if(issuesList.length === 0) return res.sendStatus(204)
        res.status(200).send(issuesList[0].issues)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const getIssues = async (req, res, next) => {
    const _id = req.params?.id
    if(!_id) return res.sendStatus(400)
    try{
        const foundIssues = await Project.find({_id}, 'issues').lean().exec()
        if(!foundIssues) return res.status(400).send({'error': 'issues not found'})
        res.status(200).send(foundIssues)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const addIssue = async (req, res, next) => {
    const projectId = req?.params?.id
    const name = req?.body?.name
    const label = req?.body?.label
    const priority = req?.body?.priority
    req.body._id= uniqid() 
    req.body.author = req.username
    if(!projectId || !name || !label || !priority){
        return res.status(400).send({
            'error' : 'one or more required fields are missing'
        })
    }  
    try{
        const updatedProject = await Project.findOneAndUpdate( {_id: projectId}, 
            {
                '$push': {issues: req.body},
                '$inc': { issueIncrement: 1 },
            },
            {
                new: true,
                rawResult: true
            }
        ).exec()
        if(!updatedProject.ok) return res.sendStatus(500)
        const projectToSend = updatedProject.value.toObject({getters: true, flattenMaps: true })
        const newIssues = projectToSend?.issues
        return res.status(201).send(newIssues)
    } catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const updateIssue = async (req, res, next) => {
    const _id = req.params?.id
    const updateIssueId = req.body?._id
    if(!_id || !updateIssueId) return res.status(400).send({'error' : 'one or more required fields are missing'})
    try{   
        if(req?.body?.filename){
            const foundProject = await Project.findOne(
                {
                _id,
                'issues': {$elemMatch:  {_id: updateIssueId}}
                }, 'issues.$'
            ).lean().exec()
            const storedImagePath = foundProject?.issues[0]?.image
            if(storedImagePath && storedImagePath !== '' ){
                fs.rmSync(path.join(__dirname, '..', 'uploads', storedImagePath), {force: true})
            }
        }
        const updatedProject = await Project.findOneAndUpdate({
            _id,
            'issues._id': updateIssueId
        },
        { $set: {'issues.$': req.body } },
        {
            new: true,
            rawResult: true,
        }
        ).exec()
        if(!updatedProject?.ok) return res.status(400).send({'error': 'project not found'})
        const projectToSend = updatedProject.value.toObject({getters: true, flattenMaps: true })
        const updatedIssues = projectToSend?.issues
        return res.status(200).send(updatedIssues)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const removeIssue = async (req, res, next) => {
    const _id = req.params?.id
    const deleteIssueId = req.params?.issueId
    if(!_id || !deleteIssueId) return res.status(400).send({'error': 'missing id'})
    try{
        let imageToRemove = ''
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const issues = foundProject.issues
        foundProject.issues = issues.filter(issue =>{ 
            if(issue._id === deleteIssueId && issue.image){
                imageToRemove = issue.image        
            } 
            return issue._id !== deleteIssueId
        })
        foundProject.issueIncrement = foundProject.issueIncrement - 1
        await foundProject.save()
        imageToRemove !== '' && fs.rmSync(path.join(__dirname, '..', 'uploads', imageToRemove), {force: true})
        const projectToSend = foundProject.toObject({getters: true, flattenMaps: true })
        return res.status(200).send(projectToSend.issues)
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

const removeComment = async (req, res, next) => {
    const _id = req.params?.id
    const issueId = req.params?.issueId
    const deleteCommentId = req.params?.commentId
    if(!_id || !issueId || !deleteCommentId ) return res.status(400).send({'error': 'missing id'})
    try{
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.status(400).send({'error': 'project not found'})
        const foundIssue = foundProject.issues.find(issue => issue._id === issueId)
        if(!foundIssue) return res.status(400).send({'error': 'issue not found'}) 
        foundIssue.comments = foundIssue.comments.filter(comment => comment._id != deleteCommentId)
        await foundProject.save()
        return res.status(200).send(foundIssue.toObject({getters: true, flattenMaps: true }))
    }catch(error){
        logErrorConsole(error.name, error.message)
        next(error)
    }
}

module.exports = { getUserIssues, getIssues, addIssue, updateIssue, removeIssue, removeComment }