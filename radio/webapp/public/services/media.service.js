angular.module('CoffeeHouseRadio.media.service', [])

.factory('MediaService', ['$http', function($http) {
	return {
		getLive: function(){
			return $http.get('http://192.241.169.148:4000/live');
		}
	};
}]);