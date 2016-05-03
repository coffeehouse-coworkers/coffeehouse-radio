angular.module('CoffeeHouseRadio.player.controller', [])
.controller('PlayerCtrl', ['$scope', 'MediaService', function($scope, MediaService){

	$scope.scWidget = null;

	var activePlaylist = null;
	var activeTrackId = null;
	var activeTime = null;

	function lookupPlaylistIndex(trackList, trackId){
		let playlistIndex = null;
		for(let i = 0; i < trackList.length; i++){
			if(trackList[i].id === trackId){
				playlistIndex = i;
				break;
			}
		}
		return playlistIndex;
	}

	function trackIsPlaying(){
		console.log("Jumping to live time");
		$scope.scWidget.seekTo(activeTime);
		$scope.scWidget.unbind(SC.Widget.Events.PLAY);
	}

	function tracksLoaded(){
		$scope.scWidget.getSounds(function(trackList){
			$scope.scWidget.skip(lookupPlaylistIndex(trackList, activeTrackId));
			$scope.scWidget.play();
		});
		$scope.scWidget.unbind(SC.Widget.Events.READY);
	}

	function restSucessHandler(response){

		// set song live state
		var liveSongInfo = response.data;
		console.log("Live Info: ", liveSongInfo);
		activePlaylist = liveSongInfo.playlistUrl;
		activeTrackId = liveSongInfo.trackId;
		activeTime = liveSongInfo.seekTime;

		// load widget
		$scope.scWidget = SC.Widget("sc-widget");

		// bind event listeners
		$scope.scWidget.bind(SC.Widget.Events.PLAY, trackIsPlaying);	
		$scope.scWidget.bind(SC.Widget.Events.READY, tracksLoaded);

		// load playlist
		$scope.scWidget.load(activePlaylist, {
			show_comments: false
		});
	}

	function restErrorHandler(err){
		console.error(err);
	}

	function initialize(){
		MediaService.getLive().then(restSucessHandler, restErrorHandler);
	};

	initialize();
}]);


// For reference:

// _resource_id: 149294836
// _resource_type: "sound"
// artwork_url: "https://i1.sndcdn.com/artworks-000079294323-l701zd-large.jpg"
// comment_count: 52
// commentable: true
// created_at: "2014-05-13T09:35:58Z"
// description: "'The Whistle Song' taken from Netsky's album '2'.
// ↵Get it here http://smarturl.it/netsky2 and here http://hospi.tl/netsky2"
// domain_lockings: Array[0]
// download_count: 0
// download_url: null
// downloadable: false
// duration: 191912
// embeddable_by: "all"
// full_duration: 191912
// genre: ""
// has_downloads_left: true
// id: 149294836
// kind: "track"
// label_name: ""
// last_modified: "2016-04-05T12:06:26Z"
// license: "all-rights-reserved"
// likes_count: 3031
// monetization_model: "NOT_APPLICABLE"
// permalink: "the-whistle-song-3"
// permalink_url: "https://soundcloud.com/netsky/the-whistle-song-3"
// playable: true
// playback_count: 215564
// policy: "ALLOW"
// public: true