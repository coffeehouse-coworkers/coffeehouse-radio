angular.module('CoffeeHouseRadio.player.controller', [])
.controller('PlayerCtrl', ['$scope', 'MediaService', function($scope, MediaService){

	$scope.scWidget = null;

	var activePlaylist = null;
	var activeTrack = null;
	var activeTime = null;

	function songIsPlaying(){
		console.log("Jumping to live time");
		$scope.scWidget.seekTo(activeTime);
		$scope.scWidget.unbind(SC.Widget.Events.PLAY);
	}

	function restSucessHandler(response){

		// set song live state
		var liveSongInfo = response.data;
		activePlaylist = liveSongInfo.playlistUrl;
		activeTrack = liveSongInfo.trackIndex;
		activeTime = liveSongInfo.seekTime;

		// load widget
		$scope.scWidget = SC.Widget("sc-widget");

		// bind event listeners
		$scope.scWidget.bind(SC.Widget.Events.PLAY, songIsPlaying);	

		// load playlist
		$scope.scWidget.load(activePlaylist, {
			auto_play: true,
			show_comments: false,
			start_track: activeTrack
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