angular.module('CoffeeHouseRadio', [
    'ui.router',
    'CoffeeHouseRadio.player.controller'
])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('player', {
            url: "/",
            templateUrl: "player/view.html",
            controller: "PlayerCtrl"
        });

    // use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);