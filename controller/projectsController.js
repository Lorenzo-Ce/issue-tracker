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
    }catch(error){
        console.log(error)
    } 
    res.status(201).send({'message': `Project ${name} created`})
}

const getAllProjects = async (req, res, err) => {
    const { username } = req.body
    const matchedUser = await User.findOne({ username }).exec()
    
    const result = await Project.aggregate([{
        $match: {
            _id : {$in: matchedUser.projects } 
        }
    }])
    console.log(result)
    const sendResult = JSON.stringify(result)
    res.status(200).send(sendResult)
}


const deleteProject = async (req, res, err) => {}

module.exports = {getAllProjects, addProject, deleteProject}