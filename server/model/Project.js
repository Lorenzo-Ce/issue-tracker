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
    startDate: Date,
    endDate: Date,
    members: [String],
    roles: {
        type: Map,
        of: Array,
        default: {}
    },
    issueIncrement: {type: Number, default : 0},
    issues: [{
        _id: {type: String},
        name: {
            type: String,
            min: 3,
            max: 30
        },
        openingDate: Date,
        closingDate: Date,
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
            date: Date
        }],
        images:[{
            data: Buffer,
            type: String
        }]
    }]
  });

  const Project = mongoose.model('Project', ProjectSchema)

  module.exports = Project