const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

// Update user password
userSchema.methods.updatePassword = async function (password) {
  const user = this
  try {
    user.password = password
    user.save()
  } catch (error) {
    console.log('error updating password: ', error)
    return error
  }
}

// is user an admin
userSchema.methods.isAdmin = function () {
  return this.role === 'admin'
}

const User = mongoose.model('User', userSchema)

module.exports = User
