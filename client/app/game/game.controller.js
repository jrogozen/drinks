app.controller('gameCtrl', ['$scope', 'activityFactory', 'drinkFactory', function($scope, activityFactory, drinkFactory) {
  
  $scope.game = {};

  function getPlayers() {
  }

  function getActivity() {
    return activityFactory.get();
  }

  function getDrink() {
    return drinkFactory.get();
  }

  $scope.play = function() {
    $scope.game.activity = getActivity();
    $scope.game.drink = getDrink();
  };

}]);