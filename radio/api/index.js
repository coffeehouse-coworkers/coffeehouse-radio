"use strict";

/**
 * API
 */
const routes = require('./routes');

const apiCtrl = require('./controllers');

/**
 * Plugin Registration
 */
exports.register = function (server, options, next) {

	let api = server.select('api');

	// load consumer routes
	api.route(routes);

	apiCtrl.initRadio(function(err){
		if(err){
			throw err;
		}
		else {
			next();
		}
	});
};

/**
 * Plugin Attributes
 * contains Hapi plugin attribute information (name, version, etc)
 */
exports.register.attributes = {
    pkg: require("./package.json")
};