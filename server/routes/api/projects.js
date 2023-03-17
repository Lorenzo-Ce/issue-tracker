const express = require('express')
const router = express.Router()
const roles = require('../../config/roles')
const errorHandler = require('../../middleware/errorHandler')
const { getAllProjects, addProject, deleteProject, getProject, updateProject } = require('../../controller/projectsController')
const { getUserIssues, getIssues, addIssue, updateIssue, removeIssue, removeComment } = require('../../controller/projectsIssueController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const { verifyAuthorization } = require('../../middleware/verifyAuthorization')
const multipartFormHandler = require('../../middleware/multipartFormHandler')
const multer = require('multer')
const fileFilter = require('../../config/fileFilter')
const storage = require('../../config/storageOptions')
const FILE_LIMIT_500KB = 1024 * 512

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: FILE_LIMIT_500KB
    }
})

router.use(verifyAccessToken)

router.route('/') 
    .get(getAllProjects)
    .post(addProject)
    
router.route('/issues')
    .get(getUserIssues)

router.route('/:id')
    .get(verifyAuthorization(roles.Lead, roles.Dev), getProject)
    .put(verifyAuthorization(roles.Lead, roles.Dev), updateProject)
    .delete(verifyAuthorization(roles.Lead), deleteProject)
    
router.route('/:id/issues')
    .get(verifyAuthorization(roles.Lead, roles.Dev), getIssues)
    .post(verifyAuthorization(roles.Lead, roles.Dev), upload.single('imageToAdd'), multipartFormHandler, addIssue)
    .put(verifyAuthorization(roles.Lead, roles.Dev), upload.single('imageToAdd'), multipartFormHandler, updateIssue)

router.route('/:id/issues/:issueId')
    .delete(verifyAuthorization(roles.Lead), removeIssue)

router.route('/:id/issues/:issueId/:commentId')
    .delete(removeComment)

router.use(errorHandler)

module.exports = router