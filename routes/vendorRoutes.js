const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const vendorList = require('../utils/vendors/vendorList');

module.exports = app => {
	app.get('/api/vendors', (req, res) => {
		res.send(vendorList)
	});
};
