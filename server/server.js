const mongoose = require('mongoose')
const app = require('./app')
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'..', '.env')})
const PORT = process.env.PORT || 3500


mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
    console.log(`The server is currently running on PORT: ${PORT}`)
    })
})