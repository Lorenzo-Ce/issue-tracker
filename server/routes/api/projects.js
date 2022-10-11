const express = require('express')
const roles = require('../../config/roles')
const router = express.Router()
const { getAllProjects, addProject, deleteProject, getProject, updateProject } = require('../../controller/projectsController')
const { getIssues, addIssue, removeIssue, updateIssue } = require('../../controller/projectsIssueController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const { verifyAuthorization } = require('../../middleware/verifyAuthorization')

router.use(verifyAccessToken)

router.route('/') 
    .get(getAllProjects)
    .post(addProject)

router.route('/:id')
    .get(verifyAuthorization(roles.Lead, roles.Member), getProject)
    .put(verifyAuthorization(roles.Lead, roles.Member), updateProject)
    .delete(verifyAuthorization(roles.Lead), deleteProject)
    
router.route('/:id/issues')
    .get(verifyAuthorization(roles.Lead, roles.Member), getIssues)
    .post(verifyAuthorization(roles.Lead, roles.Member), addIssue)
    .delete(verifyAuthorization(roles.Lead), removeIssue)
    .put(verifyAuthorization(roles.Lead, roles.Member), updateIssue)

module.exports = router