const express = require('express')
const router = express.Router()
const { updateRefreshToken } = require('../controller/refreshController')
const errorHandler = require('../middleware/errorHandler')

router.get('/', updateRefreshToken, errorHandler)

module.exports = router