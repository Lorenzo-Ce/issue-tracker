const express = require('express')
const router = express.Router()
const { refreshToken } = require('../controller/refreshController')

router.post('/', refreshToken)