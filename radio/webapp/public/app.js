angular.module('CoffeeHouseRadio', [
    'ui.router',
    'btford.socket-io',
    'CoffeeHouseRadio.service.socket',
    'CoffeeHouseRadio.player.controller'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('player', {
            url: "/",
            templateUrl: "player/view.html",
            controller: "PlayerCtrl"
        });
}]);