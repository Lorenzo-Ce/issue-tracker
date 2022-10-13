const User = require("../model/User")


const verifyAuthorization = (...roles) => async function (req, res, next){
    const projectId = req.params?.id
    const username = req.username
    if(!projectId || !username) return res.status(400).send({'error': 'missing id or username'})
    const foundUser = await User.findOne({username}).exec()
    const projectRole = foundUser.projects.get(projectId)
    if(!projectRole){ return res.sendStatus(404)}
    if(roles.includes(projectRole)){ 
        next()
    } else return res.status(401).send({'error':'You are not authorized to make this operation'})
}

module.exports = {verifyAuthorization}