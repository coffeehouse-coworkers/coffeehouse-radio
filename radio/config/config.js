"use strict";

const Path = require('path');

module.exports = {
	general: {
		slogan: "Workin music",
		projectHome: process.env.RADIO_PROJECT_HOME || Path.join(__dirname, "..") // project home is one level above this directory
	},
	webapp: {
		name: "webapp",
		port: process.env.RADIO_WEBAPP_PORT || 3000,
		pluginLocation: "webapp", // relative to project home
		publicDirectory: "public" // relative to webapp home
	},
	socket: {
		name: "socket",
		port: process.env.RADIO_SOCKET_PORT || 4000,
		pluginLocation: "socket" // relative to project home
	}
}