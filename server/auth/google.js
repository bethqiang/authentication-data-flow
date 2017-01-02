const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../api/users/user.model');

passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function(token, refreshToken, profile, done) {
    // The callback will pass back user profile information; each service will pass it back in a different way
    // Passport standardizes the info that comes back in its profile object

    const info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };

    User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: info
    })
    .spread(user => {
      // Passport exposes a `done` callback when completed and expects us to invoke this callback
      done(null, user);
    })
    .catch(done);
  })
);

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// Handle the callback after Google has authenticated the user
router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;
