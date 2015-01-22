var app = angular.module('drink', [
  'ui.router',
  'ngResource'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}]);