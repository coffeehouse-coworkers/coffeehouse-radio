"use strict";

const Path = require('path');

module.exports = {
	general: {
		slogan: "Workin music",
		projectHome: process.env.PROJECT_HOME || Path.join(__dirname, "..") // project home is one level above this directory
	},
	webapp: {
		name: "webapp",
		port: process.env.WEBAPP_PORT || 3000,
		pluginLocation: "webapp", // relative to project home
		publicDirectory: "public" // relative to webapp home
	},
	media: {
		name: "media",
		port: process.env.MEDIA_PORT || 4000,
		pluginLocation: "media" // relative to project home
	}
}