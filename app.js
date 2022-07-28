require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const { logger } = require('./middleware/logHandler')
const cookieParser = require('cookie-parser')


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((error) => console.error(error))

app.use(logger)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.use('/register', require('./route/register'))

app.all('*', (req, res) => {
    req.accepts('application/json') ? 
    res.status(404).send({'Error' : '404 Not Found'}) :
    res.status(404).send('Error: 404 Not Found')
})

app.use(errorHandler)

module.exports = app