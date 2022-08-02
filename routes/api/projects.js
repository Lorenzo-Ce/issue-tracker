const express = require('express')
const { getAllProjects, addProject, deleteProject } = require('../../controller/projectsController')
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const router = express.Router()

router.route('/')
    //.use(verifyAccessToken)
    .get(getAllProjects)
    .post(addProject)
    .delete(deleteProject)

module.exports = router