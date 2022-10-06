const express = require('express')
const router = express.Router()
const { verifyAccessToken } = require('../../middleware/verifyAccessToken')
const { getAllUsers } = require('../../controller/usersController')

router.use(verifyAccessToken)
router.get('/', getAllUsers)


module.exports = router
