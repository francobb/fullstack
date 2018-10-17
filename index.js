const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const { createLogger, format, transports, loggers } = require('winston');
const { combine, timestamp, label, printf, colorize, json } = format;
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production'){
	//express will serve up production assets
	//like our main.js file, or main.css file
	app.use(express.static('client/build'));

	//express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}



/*  set interval method that logs messages to the console */
const ignorePrivate = format((info, opts) => {
	if (info.private) { return false; }
	return info;
});

const myFormat = printf(info => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
// const surveyLogger = createLogger({
// 	level: 'debug',
// 	// format: format.simple(),
// 	// format: format.json(),
// 	format: combine(
// 		ignorePrivate(),
// 		label({ label: 'debug logger' }),
// 		colorize(),
// 		timestamp({
// 			format: 'YYYY-MM-DD HH:mm:ss'
// 		}),
// 		myFormat
// 		// format.simple()
// 	),
// 	transports: [new transports.Console()]
// });
// const infoLevelLogger = createLogger({
// 	level: 'info',
// 	// format: json(),
// 	format: combine(
// 		label({ label: 'info logger' }),
// 		timestamp({
// 			format: 'YYYY-MM-DD HH:mm:ss'
// 		}),
// 		colorize(),
// 		myFormat
// 	),
// 	transports: [new transports.Console()]
// });
// setInterval(() => {
// 	infoLevelLogger.info('this is the info logger');
// 	// console.log('\n');
// 	surveyLogger.debug('this is the debug logger');
// 	// surveyLogger.error('Error info');
// 	// surveyLogger.warn('Warning info');
// 	surveyLogger.log({
// 		level: 'error',
// 		message: 'This is a Private error',
// 		private: true,
// 	});
// }, 5000);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
