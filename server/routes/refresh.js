const express = require('express')
const router = express.Router()
const { updateRefreshToken } = require('../controller/refreshController')

router.post('/', updateRefreshToken)

module.exports = router