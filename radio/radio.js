"use strict";

/**
 * Main file
 */
const Glue = require("glue");
const manifest = require("./config/manifest");  // defines the server and connections
const config = require("./config/config");
const options = { relativeTo: config.general.projectHome }; // relative path for plugin modules

/**
 * Glue exports a single function compose accepting a JSON manifest file 
 * specifying the Hapi server options, connections and plugins
 */
Glue.compose(manifest, options, function (err, server) {
    server.start(function(err) {

        // throw error if the server doesnt start correctly.
        if(err){ throw err }

        // Server started great, log connection information
        else {
            console.log("CoffeeHouse Radio Started!");
            console.log("Connections:");
            console.log("  >>>  Webapp: " + server.connections[0].info.address + ":" + server.connections[0].info.port);
            console.log("  >>>  Socket: " + server.connections[1].info.address + ":" + server.connections[1].info.port);
        }
    });
});