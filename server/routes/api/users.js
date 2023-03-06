const express = require('express')
const router = express.Router()
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const { getAllUsers } = require('../../controller/usersController')
const errorHandler = require('../../middleware/errorHandler')

router.use(verifyAccessToken)
router.get('/', getAllUsers, errorHandler)


module.exports = router
