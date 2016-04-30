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
			console.log(playlist);
			radioState.playlist = playlist;
			radioState.startTime = new Date();
			done();
		}
	});
};

exports.getLiveInfo = function(request, reply){

	let now = new Date();

	let elapsedTime = now.getTime() - radioState.startTime.getTime();

	let seekTime = 0;
	let trackIndex = 0;

	for(let i = 0; i < radioState.playlist.tracks.length; i++){
		if(radioState.playlist.tracks[i].duration > elapsedTime){
			seekTime = elapsedTime;
			trackIndex = i;
			break;
		}
		elapsedTime = elapsedTime - radioState.playlist.tracks[i].duration;
	}

	reply({
		playlistUrl: radioState.playlist.permalink_url,
		trackIndex: trackIndex,
		seekTime: seekTime
	});
};