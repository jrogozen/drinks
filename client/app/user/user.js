app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: 'app/user/user.html',
      controller: 'userCtrl'
    });
}]);