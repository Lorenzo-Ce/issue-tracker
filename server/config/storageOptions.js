const multer = require('multer')
const uniqid = require('uniqid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const timeId = uniqid.time()
        const newName = `${timeId}-${file.originalname}`
        cb(null, newName)
    }
})

module.exports = storage