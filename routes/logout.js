const express = require('express')
const { logOutUser } = require('../controller/logoutController')
const router = express.Router()

router.post('/', logOutUser)

module.exports = router