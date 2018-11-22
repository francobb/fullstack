const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const vendorList = require('../utils/vendors/vendorList');

module.exports = app => {
	// TODO: return JSON list of Prov + Greenleaf things
	app.get('/api/vendors', (req, res) => {
		res.send(vendorList)
	});
};
