const express = require('express')
const router = express.Router()
const { registerNewUser } = require('../controller/registerController')
const errorHandler = require('../middleware/errorHandler')

router.post('/', registerNewUser, errorHandler)


module.exports = router
