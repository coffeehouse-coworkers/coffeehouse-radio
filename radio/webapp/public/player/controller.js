angular.module('CoffeeHouseRadio.player.controller', [])
.controller('PlayerCtrl', ['$scope', 'MediaSocket', function($scope, MediaSocket){
	$scope.currentSong = {
		source: 'youtube',
		url: 'https://www.youtube.com/watch?v=lP0D5u3EMfA',
		time: 68
	};

	// cleanup listeners
	$scope.$on('$destroy', function(event){
		MediaSocket.removeAllListeners();
	});
}]);