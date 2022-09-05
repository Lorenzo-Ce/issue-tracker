const express = require('express')
const router = express.Router()
const { getAllProjects, addProject, deleteProject, getProject, updateProject } = require('../../controller/projectsController')
const { getIssues, addIssue, removeIssue, updateIssue } = require('../../controller/projectsIssueController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')

router.use(verifyAccessToken)

router.route('/') 
    .get(getAllProjects)
    .post(addProject)

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject)
    
router.route('/:id/issues')
    .get(getIssues)
    .post(addIssue)
    .delete(removeIssue)
    .put(updateIssue)

module.exports = router