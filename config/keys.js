if (node.process.ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}