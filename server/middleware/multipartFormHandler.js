const multipartFormHandler = (req, res, next) => {
    try{
        req.body.members = typeof(req.body.members) === 'string' ? JSON.parse(req.body?.members) : req.body.members
        req.body.comments = typeof(req.body.comments) === 'string' ? JSON.parse(req.body?.comments) : req.body.comments
        if(req.file?.filename) { 
            req.body.image = req.file?.filename 
        }
        console.log(req.body.image)
        next()
    } catch (error){
        res.status(500).send(error.message)
    }

}

module.exports = multipartFormHandler