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
    .get(verifyAuthorization(roles.Manager, roles.Developer, roles.Tester, roles.Designer), getProject)
    .put(verifyAuthorization(roles.Manager, roles.Developer), updateProject)
    .delete(verifyAuthorization(roles.Manager), deleteProject)
    
router.route('/:id/issues')
    .get(verifyAuthorization(roles.Manager, roles.Developer, roles.Tester, roles.Designer), getIssues)
    .post(verifyAuthorization(roles.Manager, roles.Developer, roles.Tester, roles.Designer), addIssue)
    .delete(verifyAuthorization(roles.Manager), removeIssue)
    .put(verifyAuthorization(roles.Manager, roles.Developer, roles.Tester, roles.Designer), updateIssue)

module.exports = router