var app = angular.module('drink', [
  'ui.router',
  'ngResource'
]);

app.constant('API_URL', 'http://localhost:8080/api');

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
}]);