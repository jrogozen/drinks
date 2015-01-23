app.controller('gameCtrl', ['$scope', 'activityFactory', 'drinkFactory', function($scope, activityFactory, drinkFactory) {
  
  $scope.game = {};

  $scope.playing = false;

  function getPlayers() {
    return [
      {
        _id: 0,
        name: "Jon"
      },
      {
        _id: 1,
        name: "Parag"
      }
    ];
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
    $scope.game.players = getPlayers();
    $scope.playing = true;
  };

}]);