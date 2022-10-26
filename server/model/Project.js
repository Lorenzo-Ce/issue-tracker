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
        default: '',
        required: true
    },
    status: {
        type: String,
        enum: ['Open','Paused','Closed'],
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
    bugCount: {type: Number, default : 0},
    todoCount: {type: Number, default : 0},
    featureCount: {type: Number, default : 0},
    designCount: {type: Number, default : 0},
    issues: [{
        _id: String,
        name: {
            type: String,
            min: 1,
            max: 30
        },
        author: {
            type: String,
            default: '',
        },
        status: {
            type: String, 
            default: 'Open',
            enum: ['Open','Paused','Closed']
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
            _id: String,
            author: String,
            text: String,
            date: Date
        }],
        image:{
            type: String
        }
    }]
  });

  const Project = mongoose.model('Project', ProjectSchema)

  module.exports = Project