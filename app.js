require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logHandler')
const { verifyAccessToken } = require('./middleware/verifyAccessToken')
const { errorHandler } = require('./middleware/errorHandler')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((error) => console.error(error))

app.use(logger)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/refresh', require('./routes/refresh'))

// app.use(verifyAccessToken)

app.all('*', (req, res) => {
    req.accepts('application/json') ? 
    res.status(404).send({'Error' : '404 Not Found'}) :
    res.status(404).send('Error: 404 Not Found')
})

app.use(errorHandler)

module.exports = app