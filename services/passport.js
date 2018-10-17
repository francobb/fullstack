const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientId = require('../config/keys').clientId;
const clientSecret = require('../config/keys').clientSecret;
const mongoose = require('mongoose');
const {authLogger} = require('../utils/logger');

const User = mongoose.model('users'); // pulls schema from mongoose

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: clientId,
			clientSecret: clientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				authLogger.info(`${existingUser._id} has logged in.`);
				done(null, existingUser);
			} else {

				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}

		}
	)
);
