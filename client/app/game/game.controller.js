app.controller('gameCtrl', ['$scope', 'activityFactory', 'drinkFactory', function($scope, activityFactory, drinkFactory) {
  
  $scope.game = {};
  $scope.yt = {
    width: '100%',
    height: '100%',
    videoid: ''
  };

  $scope.playing = false;
  $scope.videoPlaying = false;

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
    activityFactory.get()
      .$promise.then(function(activities) {
        $scope.game.activity = activities[Math.floor(Math.random() * activities.length)];
      });
  }

  function getDrink() {
    return drinkFactory.get();
  }

  function setVideo(id) {
    $scope.yt.videoid = id;
  }

  $scope.setVideo = function(id) {
    setVideo(id);
    $scope.videoPlaying = true;
  };

  $scope.play = function() {
    getActivity();
    $scope.game.drink = getDrink();
    $scope.game.players = getPlayers();
    $scope.playing = true;
  };

}]);