app.controller('gameCtrl', ['$scope', 'activityFactory', 'drinkFactory', 'userFactory', 'playerFactory', function($scope, activityFactory, drinkFactory, userFactory, playerFactory) {
  
  $scope.game = {};

  $scope.yt = {
    width: '100%',
    height: '100%',
    videoid: ''
  };

  $scope.playing = false;
  $scope.videoPlaying = false;

  function getActivity() {
    activityFactory.get()
      .$promise.then(function(activities) {
        $scope.game.activity = activities[_.random(0, activities.length-1)];
      });
  }

  function getDrink() {
    drinkFactory.get()
      .$promise.then(function(drinks) {
        $scope.game.drink = drinks[_.random(0, drinks.length-1)];
      });
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
    getDrink();
    getUsers();
    $scope.playing = true;
  };

}]);