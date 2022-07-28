const { Schema, default: mongoose } = require('mongoose')

const UserSchema = new Schema({
    firstName:  String, 
    lastName: String,
    username: {
        type: String,
        min: 4,
        max: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 128
    },
    projects : [Schema.Types.ObjectId],
  });

  const User = mongoose.model('User', UserSchema)

  module.exports = User