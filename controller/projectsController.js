const Project = require("../model/Project")
const User = require("../model/User")

const addProject = async (req, res, err) => {
    const name = req.body?.name
    const status = req.body?.status
    const members = req.body?.members
    const username = req.body?.username

    if(!name || !status || !members || !username){
       return res.status(400).send({'error' : 'missing one or more required field'})
    }

    try{
        const newProject = await Project.create({name, status, members})
        const result = await User.findOneAndUpdate(
                                {username}, 
                                {$addToSet: {projects : newProject._id}}, 
                                { rawResult: true} 
                            ).exec()
        if(!result.lastErrorObject.updatedExisting){
            await Project.deleteOne({_id: newProject._id})
            return res.sendStatus(400)
        }  
        res.status(201).send({'message': `Project ${name} created`})
    }catch(error){
        console.log(error)
    } 
}

const getAllProjects = async (req, res, err) => {
    const { username } = req.body
    if(!username) return res.status(400).send({'error':'Missing username required field'})
    try{
        const matchedUser = await User.findOne({ username }).exec()
        if(!matchedUser) return res.sendStatus(400)
        const result = await Project.aggregate([{
            $match: {
                _id : {$in: matchedUser.projects } 
            }
        }])
        if(result.length === 0){
            return res.status(204).send({})
        }
        else{
            const sendResult = JSON.stringify(result)
            res.status(200).send(sendResult)
        }
    }catch(error){
        console.log(error)
    }
}


const deleteProject = async (req, res, err) => {}

module.exports = {getAllProjects, addProject, deleteProject}