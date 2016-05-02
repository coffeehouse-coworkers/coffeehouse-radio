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

            server.route({
                method: 'OPTIONS',
                path: '/{p*}',
                config: {
                    handler: function(request, reply){
                        reply(true)
                            .header('access-control-allow-headers', 'accept, authorization, content-type')
                            .header('access-control-allow-origin', '*')
                            .header('access-control-allow-methods', 'GET, PUT, POST, DELETE, OPTIONS');
                    }
                }
            });

            console.log("CoffeeHouse Radio Started!");
            console.log("Connections:");
            console.log("  >>>  Webapp: " + server.connections[0].info.address + ":" + server.connections[0].info.port);
            console.log("  >>>  API: " + server.connections[1].info.address + ":" + server.connections[1].info.port);
        }
    });
});