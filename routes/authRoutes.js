const passport = require('passport');

module.exports = app => {

	app.get(
		'/auth/google',
		passport.authenticate('googleStrategy', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('googleStrategy'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	
	app.get(
		'/auth/strava',
		passport.authenticate('stravaStrategy', {
			scope: ['public']
		})
	);
	
	app.get(
		'/auth/strava/callback',
		passport.authenticate('stravaStrategy', {
			failureRedirect: '/',
			successRedirect: '/strava',
		})
	);

};
