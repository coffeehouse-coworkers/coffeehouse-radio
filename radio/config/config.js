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
	api: {
		name: "api",
		port: process.env.RADIO_API_PORT || 4000,
		pluginLocation: "api" // relative to project home
	},
	soundcloud: {
		clientId: process.env.SC_CLIENT_ID || 'CLIENT_ID',
		clientSecret: process.env.SC_CLIENT_SECRET || 'CLIENT_SECRET',
		redirectUri: "http://www.coffeehousecoworkers.com/redirect"
	}
}