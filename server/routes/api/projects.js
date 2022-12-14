const express = require('express')
const roles = require('../../config/roles')
const router = express.Router()
const { getAllProjects, addProject, deleteProject, getProject, updateProject } = require('../../controller/projectsController')
const { getIssues, addIssue, updateIssue, removeIssue, removeComment } = require('../../controller/projectsIssueController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const { verifyAuthorization } = require('../../middleware/verifyAuthorization')
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

router.route('/:id')
    .get(verifyAuthorization(roles.Lead, roles.Member), getProject)
    .put(verifyAuthorization(roles.Lead, roles.Member), updateProject)
    .delete(verifyAuthorization(roles.Lead), deleteProject)
    
router.route('/:id/issues')
    .get(verifyAuthorization(roles.Lead, roles.Member), getIssues)
    .post(verifyAuthorization(roles.Lead, roles.Member), upload.single('image'), addIssue)
    .put(verifyAuthorization(roles.Lead, roles.Member), upload.single('image'), updateIssue)

router.route('/:id/issues/:issueId')
    .delete(verifyAuthorization(roles.Lead), removeIssue)

router.route('/:id/issues/:issueId/:commentId')
    .delete(removeComment)

module.exports = router