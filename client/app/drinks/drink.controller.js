app.controller('drinkCtrl', ['$scope', '$stateParams', '$state', 'drinkFactory', function($scope, $stateParams, $state, drinkFactory) {

  if($stateParams.id) {
    drinkFactory.find($stateParams.id);
    $scope.drink = drinkFactory.models.drink;
  }

  $scope.addDrink = function(drink) {
    drinkFactory.add(drink).$promise.then(function(data) {
      $scope.drink = {};
      $state.go('drinks.list');
    });
  };

}]);