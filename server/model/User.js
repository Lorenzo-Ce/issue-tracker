const { Schema, default: mongoose } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        set: (value) => value.toLowerCase()
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 128
    },
    username: {
        type: String,
        min: 4,
        max: 20
    },
    refreshToken: {
        type: String,
        default: ''
    },
    emailAuthenticated: {
        type: Boolean,
        default: false
    }, 
    projects: {
        type: Map, 
        of: String,
        default: () => ({})
    }
  });

  const User = mongoose.model('User', UserSchema)

  module.exports = User