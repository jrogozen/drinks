app.controller('userCtrl', ['$scope', 'userFactory', function($scope, userFactory) {

  $scope.users = userFactory.get();

}]);