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
    if(!_id) return res.sendStatus(400)
    const foundProject = await Project.findById({_id})
    if(!foundProject) return res.status(400).send({'error': 'project not found'})
    
}
const removeIssue = async (req, res, err) => {}
const updateIssue = async (req, res, err) => {}

module.exports = {getIssues, addIssue, removeIssue, updateIssue}