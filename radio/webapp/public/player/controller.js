angular.module('CoffeeHouseRadio.player.controller', [])
.controller('PlayerCtrl', ['$scope', function($scope){
	
	var activePlaylist = "https://soundcloud.com/tifffanaynay/sets/gro0ovy";
	var activeTrack = 3;
	var activeTime = 40000;

	$scope.scWidget = null;

	function songIsPlaying(){
		console.log("Jumping to live time");
		$scope.scWidget.seekTo(activeTime);
		$scope.scWidget.unbind(SC.Widget.Events.PLAY);
	}

	function initialize(){

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
	};

	initialize();
}]);