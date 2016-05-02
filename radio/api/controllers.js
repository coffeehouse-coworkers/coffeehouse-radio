'use strict';

const radioState = {
	playlist: null,
	startTime: null
};

const SC = require('../utilities/soundcloud.utility');

exports.initRadio = function(done){
	SC.get('/playlists/47565276', function(err, playlist) {
		if(err){
			done(err);
		}
		else {
			radioState.playlist = playlist;
			radioState.startTime = new Date();
			done();
		}
	});
};

exports.getLiveInfo = function(request, reply){

	let now = new Date();
	let playlistDuration = radioState.playlist.duration;
	let overallDifference = now.getTime() - radioState.startTime.getTime();
	let elapsedTime = overallDifference % playlistDuration; // handles loop around

	let seekTime = 0;
	let trackIndex = 0;

	for(let i = 0; i < radioState.playlist.tracks.length; i++){

		let trackDuration = radioState.playlist.tracks[i].duration;
		if(trackDuration > elapsedTime){
			seekTime = elapsedTime;
			trackIndex = i;
			break;
		}
		elapsedTime = elapsedTime - trackDuration;
	}

	let response = {
		playlistUrl: radioState.playlist.permalink_url,
		trackIndex: trackIndex,
		seekTime: seekTime
	};

	reply(response);
};