const { Schema, default: mongoose } = require('mongoose')

const RoleSchema = new Schema({
    role: {
        type: String,
        enum: ['Manager','Developer','Designer','Tester']
    }
});

  const Role = mongoose.model('Role', RoleSchema)

  module.exports = Role