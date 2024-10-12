const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()
const facebookStrategy = require('passport-facebook').Strategy
const User = require('../model/UserPassport')

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        accountId: profile.id,
        displayName: profile.displayName,
        provider: profile.provider
      }

      try {
        let user = await User.findOne({ accountId: profile.id })

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/dashboard'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)
// presist user data
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})
module.exports = router
