require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const { logger } = require('./middleware/logHandler')
const app = express()
const PORT = process.env.PORT || 3500

app.use(logger)

app.use(cors())
app.use(express.json())
// Handles form with post method
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
})

app.all('*', (req, res) => {
    req.accepts('json') ? 
    res.status(404).send({"error_message" : "404 Not Found"}) :
    res.status(404).send("Error: 404 Not Found")
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The server is currently running on PORT: ${PORT}`)
})