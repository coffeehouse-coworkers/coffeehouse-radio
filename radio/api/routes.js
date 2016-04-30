'use strict';

const apiCtrl = require('./controllers.js');

module.exports = [
	{
        method: 'GET',
        path: '/live',
        config: {
            handler: apiCtrl.getLiveInfo
        }
	}
]