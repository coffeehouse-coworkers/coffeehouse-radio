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
            port: config.socket.port,
            labels: [config.socket.name]
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
                register: "./" + config.socket.pluginLocation
            },
            options: {
                select: [config.socket.name]
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