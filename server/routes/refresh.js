const express = require('express')
const router = express.Router()
const { updateRefreshToken } = require('../controller/refreshController')

router.get('/', updateRefreshToken)

module.exports = router