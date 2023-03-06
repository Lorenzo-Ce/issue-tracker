const express = require('express')
const router = express.Router()
const { logOutUser } = require('../controller/logoutController')
const errorHandler = require('../middleware/errorHandler')

router.post('/', logOutUser, errorHandler)

module.exports = router