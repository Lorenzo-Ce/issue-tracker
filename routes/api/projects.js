const express = require('express')
const router = express.Router()
const { getAllProjects, addProject, deleteProject } = require('../../controller/projectsController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')


router.route('/') //.use(verifyAccessToken)
    .get(getAllProjects)
    .post(addProject)
    .delete(deleteProject)

module.exports = router