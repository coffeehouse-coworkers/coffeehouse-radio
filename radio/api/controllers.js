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
			console.log('Initializing with playlist', playlist);
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
	let trackId = null;

	for(let i = 0; i < radioState.playlist.tracks.length; i++){

		let trackDuration = radioState.playlist.tracks[i].duration;
		if(trackDuration > elapsedTime){
			seekTime = elapsedTime;
			trackId = radioState.playlist.tracks[i].id;
			break;
		}
		elapsedTime = elapsedTime - trackDuration;
	}

	let response = {
		playlistUrl: radioState.playlist.permalink_url,
		trackId: trackId,
		seekTime: seekTime
	};

	// Debug logs
	console.log('Playlist: ', '/playlists/47565276');
	console.log('Playlist start: ', radioState.startTime);
	console.log('Client time: ', now);
	console.log('Playlist duration: ', playlistDuration);
	console.log('Overall difference: ', overallDifference);
	console.log('Elapsed time: ', elapsedTime);

	reply(response);
};


// For reference:

// Initializing with playlist { duration: 73423002,
//   release_day: null,
//   permalink_url: 'http://soundcloud.com/tifffanaynay/sets/gro0ovy',
//   genre: '',
//   permalink: 'gro0ovy',
//   purchase_url: null,
//   release_month: null,
//   description: '',
//   uri: 'https://api.soundcloud.com/playlists/47565276',
//   label_name: '',
//   tag_list: '',
//   release_year: null,
//   track_count: 181,
//   user_id: 105978028,
//   last_modified: '2014/08/21 03:23:01 +0000',
//   license: 'all-rights-reserved',
//   tracks: 
//    [ { kind: 'track',
//        id: 66993061,
//        created_at: '2012/11/11 15:07:36 +0000',
//        user_id: 20910964,
//        duration: 379410,
//        commentable: true,
//        state: 'finished',
//        original_content_size: 15384428,
//        last_modified: '2016/03/18 10:14:14 +0000',
//        sharing: 'public',
//        tag_list: '',
//        permalink: 'netsky-eyes-closed',
//        streamable: true,
//        embeddable_by: 'all',
//        downloadable: false,
//        purchase_url: null,
//        label_id: null,
//        purchase_title: null,
//        genre: '',
//        title: 'Netsky - Eyes Closed',
//        description: '',
//        label_name: '',
//        release: '',
//        track_type: null,
//        key_signature: null,
//        isrc: null,
//        video_url: null,
//        bpm: null,
//        release_year: null,
//        release_month: null,
//        release_day: null,
//        original_format: 'mp3',
//        license: 'all-rights-reserved',
//        uri: 'https://api.soundcloud.com/tracks/66993061',
//        user: [Object],
//        permalink_url: 'http://soundcloud.com/jefersonsalles/netsky-eyes-closed',
//        artwork_url: null,
//        waveform_url: 'https://w1.sndcdn.com/r1lqqw3wDJtg_m.png',
//        stream_url: 'https://api.soundcloud.com/tracks/66993061/stream',
//        playback_count: 158002,
//        download_count: 0,
//        favoritings_count: 3214,
//        comment_count: 36,
//        attachments_uri: 'https://api.soundcloud.com/tracks/66993061/attachments' },