angular.module('CoffeeHouseRadio.service.socket', [])
.factory('MediaSocket', ['socketFactory', function(socketFactory){
	var ioSocket = io.connect('http://192.168.33.10:4000');
	return socketFactory({
		ioSocket: ioSocket
	});
}]);