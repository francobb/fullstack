const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientId = require('../config/keys').googleClientId;
const clientSecret = require('../config/keys').googleClientSecret;
const mongoose = require('mongoose');

const User = mongoose.model('users'); // pulls schema from mongoose

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
// 	User.findById(id)
// 		.then(user => {
// 			done(null, user);
// 		});
// });

passport.use('googleStrategy',
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

				done(null, existingUser);
			} else {

				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}

		}
	));
