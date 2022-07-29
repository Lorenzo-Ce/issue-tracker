const { Schema, default: mongoose } = require('mongoose')

const ProjectSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 30,
        required: true
    },
    status: {
        type: String,
        enum: ['Open','Paused','Closed'],
        required: true
    },
    startDate: String,
    endDate: String,
    members: [{
        role: {
            type: String,
            enum: ['Manager','Developer','Designer','Tester'],
            users: [Schema.Types.ObjectId]
        },
    }],
    issues: [{
        name: {
            type: String,
            min: 3,
            max: 30
        },
        label: {
            type: String, 
            enum:['Todos','Bug','Feature','Improvement']
        },
        priority: {
            type: String, 
            enum:['Critical','Important','Normal','Low']
        },
        description: {
            type: String,
            min: 3,
            max: 500
        },
        comments: [{
            user: String,
            role: String,
            text: String,
            date: String
        }],
        images:[{
            data: Buffer,
            type: String
        }]
    }]
  });

  const Project = mongoose.model('Project', ProjectSchema)

  module.exports = Project