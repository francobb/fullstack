const {authLogger, surveyLogger} = require('../utils/logger');
module.exports = (req, res, next) => {
	if (!req.user) {
		authLogger.info('survey send attempt');
		surveyLogger.error('unauth user attempt');
		return res.status(401).send({ error: 'You must be logged in!' });
	}

	next();
};
