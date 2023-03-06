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
    startDate: {
        type: Date,
        get: (date) => date.toISOString().split('T')[0]
    },
    endDate: {
        type: Date,
        get: (date) => date.toISOString().split('T')[0]
    },
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
        _id: String,
        name: {
            type: String,
            min: 1,
            max: 30
        },
        members:[String],
        author: {
            type: String,
            default: '',
        },
        status: {
            type: String, 
            default: 'Open',
            enum: ['Open','Paused','Closed']
        },
        openingDate: {
            type: Date,
            get: (date) => date.toISOString().split('T')[0]
        },
        closingDate: {
            type: Date,
            get: (date) => date.toISOString().split('T')[0]
        },
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
  }, {toObject: { getters: true, setters: true },
  toJSON: { getters: true, setters: true },
  runSettersOnQuery: true,});

  const Project = mongoose.model('Project', ProjectSchema)

  module.exports = Project