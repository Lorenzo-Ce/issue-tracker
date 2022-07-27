require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const { logger } = require('./middleware/logHandler')
const cookieParser = require('cookie-parser')
const app = express()


app.use(logger)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.all('*', (req, res) => {
    req.accepts('json') ? 
    res.status(404).send({"error_message" : "404 Not Found"}) :
    res.status(404).send("Error: 404 Not Found")
})

app.use(errorHandler)

module.exports = app