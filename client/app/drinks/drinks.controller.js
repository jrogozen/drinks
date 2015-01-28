app.controller('drinksCtrl', ['$scope', '$stateParams', 'drinkFactory', function($scope, $stateParams, drinkFactory) {

  $scope.deleteDrink = function(drinkId) {
    drinkFactory.remove(drinkId);
  };

  $scope.drinks = drinkFactory.models.drinks;

}]);