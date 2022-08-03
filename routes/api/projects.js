const express = require('express')
const router = express.Router()
const { getAllProjects, addProject, deleteProject, getProject, updateProject } = require('../../controller/projectsController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')


router.route('/') //.use(verifyAccessToken)
    .get(getAllProjects)
    .post(addProject)

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject)
    
module.exports = router