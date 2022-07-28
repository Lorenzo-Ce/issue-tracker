require('dotenv').config()
const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')
const app = require('./app')



mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
    console.log(`The server is currently running on PORT: ${PORT}`)
    })
})