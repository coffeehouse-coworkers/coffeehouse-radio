angular.module('CoffeeHouseRadio.player.controller', [])
.controller('PlayerCtrl', ['$scope', 'MediaSocket', function($scope, MediaSocket){
	
	$scope.songList = [
		{
			type: 'youtube',
			id: 'sy1dYFGkPUE'
		},
		{
			type: 'youtube',
			id: 'djV11Xbc914'
		}
	];

	$scope.currentSong = $scope.songList[0];

	$scope.youtubePlayer = false;
	var loadYoutubePlayer = function(){
		$scope.youtubePlayer = new YT.Player('youtube-player', {
			height: '390',
			width: '640',
			videoId: $scope.currentSong.id,
			events: {
				'onReady': playNext,
				'onStateChange': youtubeStateChange
			}
		});
	};

	var startNextYoutube = function(){
		$scope.youtubePlayer.loadVideoById({
			'videoId': $scope.currentSong.id,
            'suggestedQuality': 'large'
		});
	};

	var playNext = function(){
		if($scope.currentSong.type === 'youtube'){
			if(!$scope.youtubePlayer){
				loadYoutubePlayer();
			}
			else {
				startNextYoutube();
			}
		}
	};

	var progressSong = function(){
		$scope.currentSong = $scope.songList[Math.floor(Math.random() * $scope.songList.length)];
	};

	var youtubeStateChange = function(event){
		console.log(event.data);
		if(event.data != YT.PlayerState.PLAYING){
			$scope.youtubePlayer.stopVideo();
			progressSong();
			playNext();
        }
	};

	// cleanup listeners
	$scope.$on('$destroy', function(event){
		MediaSocket.removeAllListeners();
	});

	// start radio
	playNext();

}]);