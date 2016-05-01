angular.module('CoffeeHouseRadio.media.service', [])

.factory('MediaService', ['$http', function($http) {
	return {
		getLive: function(){
			return $http.get('https://core.coffeeshopcoworkers.com/media/live');
		}
	};
}]);