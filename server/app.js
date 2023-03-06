const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const { logger } = require('./middleware/logHandler')
const errorHandler = require('./middleware/errorHandler')
const parseErrorHandler = require('./middleware/parseErrorHandler')
const corsOptions = require('./config/corsOption')
const setControlCredentials = require('./middleware/setControlCredential')
require('dotenv').config({path: path.resolve(__dirname,'..', '.env')})

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((error) => console.error(error))

app.disable('x-powered-by');
//app.use(logger)
app.use(setControlCredentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser())
app.use(mongoSanitize())

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/refresh', require('./routes/refresh'))
app.use('/users', require('./routes/api/users'))
app.use('/projects', require('./routes/api/projects'))
app.use('/images', express.static(path.join(__dirname, '/uploads')))

app.all('*', (req, res) => {
    req.accepts('application/json') ? 
    res.status(404).send({'Error' : '404 Route Not Found'}) :
    res.status(404).send('Error: 404 Route Not Found')
})
app.use(parseErrorHandler)
app.use(errorHandler)

module.exports = app