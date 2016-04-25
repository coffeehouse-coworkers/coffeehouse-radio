"use strict";

/**
 * Socket
 */
const handlers = require('./handlers');

/**
 * Plugin Registration
 */
exports.register = function (server, options, next) {

    // setup socket connections
    let io = require('socket.io')(server.select('socket').listener);
    io.on('connection', handlers.connection);

	next();
};

/**
 * Plugin Attributes
 * contains Hapi plugin attribute information (name, version, etc)
 */
exports.register.attributes = {
    pkg: require("./package.json")
};