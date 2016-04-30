'use strict';

const SC = require('node-soundcloud');
const config = require('../config/config');

SC.init({
    id: config.soundcloud.clientId,
    secret: config.soundcloud.secret,
    uri: config.soundcloud.redirectUri
});

module.exports = SC;