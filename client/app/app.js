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

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};
  $httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
  
  $httpProvider.defaults.transformRequest = function(obj) {
    if (obj) {
      return $.param(obj, true);
    }
  };
});