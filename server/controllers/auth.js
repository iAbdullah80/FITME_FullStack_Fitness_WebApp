const bcrypt = require('bcrypt')
const User = require('../model/User')

// POST /register
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const user = new User({ name, email, password })
    await user.save()
    console.log(`User ${user.name} created`)
    req.session.user = user.name
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error, could not creste a user' })
  }
}

// POST /login
exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    req.session.user = user.name
    res.status(200).json({ message: 'User logged in' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error, could not login' })
  }
}

// GET /logout
exports.logout = async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('/')
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error, could not logout' })
  }
}

// POST /reset-password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (user.isAdmin) {
      return res
        .status(401)
        .json({ message: 'Admin password cannot be reset' })
    }
    await user.updatePassword(password)
    console.log(`User ${user.name} password reset`)
    res.status(200).json({ message: 'Password reset' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
