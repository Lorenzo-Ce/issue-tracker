const Project = require('../model/Project')
const User = require('../model/User')
const mongoose = require('mongoose')

const getIssues = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.sendStatus(400)
    const foundProject = await Project.findById({_id})
    if(!foundProject) return res.status(400).send({'error': 'project not found'})
    const issues = foundProject.issues
    res.status(200).send(issues)
}

const addIssue = async (req, res, err) => {
    const _id = req.params?.id
    const name = req.body.name
    const label = req.body.label
    const priority = req.body.priority
    if(!name || !label || !priority){
        res.status(400).send({
            'error' : 'one or more required fields are missing'
        })
    }
    if(!_id) return res.sendStatus(400)
    try{
        const foundProject = await Project.findById({_id}).exec()
        if(!foundProject) return res.status(400).send({'error': 'issue not added'})
        const issueNumber = foundProject.issueIncrement
        const issueId = `${foundProject.name.slice(0,3).toUpperCase()}-${issueNumber}` 
        foundProject.issues = [...foundProject.issues, {_id: issueId, ...req.body}]
        foundProject.issueIncrement = issueNumber + 1
        await foundProject.save()
        res.sendStatus(201)
    } catch(error){console.error(error)}
}
const removeIssue = async (req, res, err) => {

}
const updateIssue = async (req, res, err) => {}

module.exports = {getIssues, addIssue, removeIssue, updateIssue}