const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const stravaClientId = require('../config/keys').stravaClientId;
const stravaClientSecret = require('../config/keys').stravaClientSecret;
const callbackURL = require('../config/keys').callbackURL;
const mongoose = require('mongoose');

const StravaUser = mongoose.model('stravaUsers');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  StravaUser.findById(id)
    .then(user => {
      done(null, user);
    })
});

const stravaConfig = {
  clientID: stravaClientId,
  clientSecret: stravaClientSecret,
  callbackURL
};

passport.use('stravaStrategy',
  new StravaStrategy(
    stravaConfig,
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await StravaUser.find({ profileId: profile.id });
      
      if (existingUser.length) {
        console.warn('this is the existing user', existingUser);
        done(null, existingUser[0]);
      } else {
        
        const user = await new StravaUser({ profileId: profile.id, name: profile.displayName }).save();
        console.warn('this is the new user: ', user);
        done(null, user);
      }
      
    }
  )
);
