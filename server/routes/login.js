const express = require('express')
const router = express.Router()
const { loginUser } = require('../controller/loginController')
const errorHandler = require('../middleware/errorHandler')

router.post('/', loginUser, errorHandler)

module.exports = router
