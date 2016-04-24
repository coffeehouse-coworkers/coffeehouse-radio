"use strict";

const config = require("./config");

module.exports = {
    server: {
        app: {
            slogan: config.general.slogan
        }
    },
    connections: [
        {
            port: config.webapp.port,
            labels: [config.webapp.name]
        },
        {
            port: config.media.port,
            labels: [config.media.name]
        }
    ],
    registrations: [
        {
            plugin: {
                register: "inert"
            }
        },
        {
            plugin: {
                register: "./" + config.webapp.pluginLocation
            },
            options: {
                select: [config.webapp.name]
            }
        },
        {
            plugin: {
                register: "./" + config.media.pluginLocation
            },
            options: {
                select: [config.media.name]
            }
        },
        {
            plugin: {
                register: "good",
                options: {
                    requestHeaders: true,
                    reporters: [
                        {
                            // reports to console which is used by PM2 logs
                            reporter: "good-console",
                            events: { 
                                response: "*",
                                log: "*", 
                                error: "*" 
                            }
                        }
                    ]
                }
            }
        }
    ]
};