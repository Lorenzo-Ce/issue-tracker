const { Schema, default: mongoose } = require('mongoose')
const ProjectSchema = new Schema({
    name: {
        type: String,
        min: 1,
        max: 30,
        required: true
    },
    description: {
        type: String,
        max: 500,
        default: ''
    },
    status: {
        type: String,
        enum: ['Open','Paused','Closed'],
        required: true,
        default: 'Open'
    },
    startDate: Date,
    endDate: Date,
    members: [String],
    roles: {
        type: Map,
        of: Array,
        default: {
            enum: ['Lead', 'Member']
        }
    },
    issueIncrement: {type: Number, default : 0},
    issues: [{
        _id: {type: String},
        name: {
            type: String,
            min: 1,
            max: 30
        },
        issueStatus: {
            type: String, 
            default: 'Open',
            enum: ['Open', 'Closed']
        },
        openingDate: Date,
        closingDate: Date,
        label: {
            type: String, 
            enum:['Todo','Bug','Feature','Design']
        },
        priority: {
            type: String, 
            enum:['Critical','Important','Normal','Low']
        },
        description: {
            type: String,
            min: 1,
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