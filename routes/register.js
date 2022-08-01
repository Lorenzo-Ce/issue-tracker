const express = require('express')
const router = express.Router()
const { registerNewUser } = require('../controller/registerController')

router.post('/', registerNewUser)


module.exports = router
