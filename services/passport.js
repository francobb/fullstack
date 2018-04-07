const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientId = require('../config/keys').clientId;
const clientSecret = require('../config/keys').clientSecret;
const mongoose = require('mongoose');

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
			callbackURL: 'https://shrouded-retreat-50289.herokuapp.com/auth/google/callback',
			proxy: true,
		},
		(accessToken, refreshToken, profile, done) => {

			User.findOne({ googleId: profile.id })
				.then(existingUser => {
					if (existingUser) {

						done(null, existingUser);
					} else {

						new User({ googleId: profile.id })
							.save()
							.then(user => done(null, user));
					}
				});

		}
	)
);
