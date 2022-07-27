require('dotenv').config()
const PORT = process.env.PORT || 3500

const app = require('./app')

app.listen(PORT, () => {
    console.log(`The server is currently running on PORT: ${PORT}`)
})