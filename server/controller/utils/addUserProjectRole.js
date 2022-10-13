const addUserProjectRole = async (member, projectId, role) => {
    try{
        if(!member) return Promise.reject('member not found')
        member.projects.set(projectId, role)
        await member.save()
        return Promise.resolve()  
    } catch (err){
        return Promise.reject(err)
    }
}

module.exports = addUserProjectRole