app.controller('mainCtrl', ['$scope', '$state', 'userFactory', 'playerFactory', function($scope, $state, userFactory, playerFactory) {
  $scope.minimumPlayers = false;
  $scope.notice = '';

  $scope.players = playerFactory.models.players;

  $scope.addPlayer = function(player) {
    playerFactory.add(player);
    $scope.player = {};
  };

  $scope.removePlayer = function(playerId) {
    playerFactory.remove(playerId).then(function() {
      $scope.players = playerFactory.models.players;
    });
  };

}]);