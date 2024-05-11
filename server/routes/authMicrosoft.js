const express = require('express');
const router = express.Router();
const passport = require('passport');

const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../model/UserPassport')

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: process.env.MICROSOFT_CALLBACK_URL,
    scope: ['user.read'],
    session: false
  },
  async function(accessToken, refreshToken, profile, done) {
    const newUser = {
      accountId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      provider: profile.provider
    }

    try {
      let user = await User.findOne({accountId: profile.id})

      if (user){
        
        done(null, user)
      } else{
        user = await User.create(newUser)
        done(null, user)
      }
      
    } catch (error) {
      console.log(error)
    }

  }
));

router.get('/auth/microsoft',
  passport.authenticate('microsoft', { session: false }));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { 
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard'
}));

router.get('login-failure', (req,res)=>{
  res.send('Something went worng...')
});

// presist user data
passport.serializeUser(function(user, done){
  done(null, user.id)
})
// Retrieve user data from session
passport.deserializeUser(async (id, done) => {
try {
  const user = await User.findById(id);
  done(null, user);
} catch (err) {
  done(err, null);
}
});
module.exports=router