const { createLogger, format, transports, loggers } = require('winston');
const { combine, timestamp, label, printf, colorize, json } = format;

const ignorePrivate = format((info, opts) => {
	if (info.private) { return false; }
	return info;
});

const myFormat = printf(info => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const surveyLogger = createLogger({
	level: 'debug',
	// format: format.simple(),
	// format: format.json(),
	format: combine(
		ignorePrivate(),
		label({ label: 'debug logger' }),
		colorize(),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		myFormat
	),
	transports: [new transports.Console()]
});
const authLogger = createLogger({
	level: 'info',
	format: combine(
		label({ label: 'info logger' }),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		colorize(),
		myFormat
	),
	transports: [new transports.Console()]
});

module.exports = {
	surveyLogger,
	authLogger,
};
