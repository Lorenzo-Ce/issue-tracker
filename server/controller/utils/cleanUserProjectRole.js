const cleanUserProjectRole = async (member, projectId) => {
    try{
        member.projects.delete(projectId)
        await member.save()
        return Promise.resolve()
    } catch (err){
        return Promise.reject(err)
    }
}

module.exports = cleanUserProjectRole