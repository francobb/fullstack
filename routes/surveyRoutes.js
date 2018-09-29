const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks For Voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const events = _.map(req.body, ({ email, url }) => {
			const pathname = new URL(url).pathname;
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname);
			if (match) {
				return { email, surveyId: match.surveyId, choice: match.choice };
			}
		});
		
		const compactEvents = _.compact(events);
		const uniqueEvents =_.uniqBy(compactEvents, 'email', 'surveyId');
		
		console.debug({uniqueEvents});
		
		res.send({});
	});
	
	// adding requiteLogin makes sure that the user is logged in during this request
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

		const { title, subject, body, recipients } = req.body;

		//create survey object
		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: new Date(),
		});


		try {
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();

			//save survey to db
			await survey.save();

			//update user credits
			req.user.credits -= 1;

			//send back user
			const user = await req.user.save();
			res.send(user);
		} catch (e) {
			res.status(422).send(e); // 422 something is wrong with the data you sent
		}
	});
};
