"use strict";

/**
 * Webapp
 */

/**
 * Plugin Registration
 */
exports.register = function (server, options, next) {

	// TODO: setup media controllers here (socket.io, db, etc)
	next();
};

/**
 * Plugin Attributes
 * contains Hapi plugin attribute information (name, version, etc)
 */
exports.register.attributes = {
    pkg: require("./package.json")
};