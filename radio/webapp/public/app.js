angular.module('CoffeeHouseRadio', [
    'ui.router',
    'CoffeeHouseRadio.player.controller'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('player', {
            url: "/",
            templateUrl: "player/player.html",
            controller: "PlayerCtrl"
        });
}]);