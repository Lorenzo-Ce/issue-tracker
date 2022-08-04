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
        res.status(201).send(JSON.stringify(newProject))
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
            return res.status(200).send(sendResult)
        }
    }catch(error){
        console.log(error)
    }
}

// gets and deletes single projects

const getProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id from URL'})
    const foundProject = await Project.findOne({_id}).exec()
    if(!foundProject) return res.sendStatus(404)
    const project = JSON.stringify(foundProject)
    return res.status(200).send(project)
}

const updateProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id from URL'})
}

const deleteProject = async (req, res, err) => {
    const _id = req.params?.id
    if(!_id) return res.status(400).send({'error': 'missing id from URL'})
    const result = await Project.deleteOne({_id})
    if(result.deletedCount === 0){
        return res.sendStatus(204)
    } else{
        return res.sendStatus(200)
    }
}


    module.exports = {getAllProjects, addProject, getProject, updateProject, deleteProject}