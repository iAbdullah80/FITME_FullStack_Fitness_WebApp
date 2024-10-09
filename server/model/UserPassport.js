const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  profileImage: {
    type: String
  },
  provider: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('UserPassport', UserSchema)
