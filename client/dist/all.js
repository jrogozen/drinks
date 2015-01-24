var app = angular.module('drink', [
  'ui.router',
  'ngResource'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
}]);
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
    return activityFactory.get();
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
    $scope.game.activity = getActivity();
    $scope.game.drink = getDrink();
    $scope.game.players = getPlayers();
    $scope.playing = true;
  };

}]);
app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      templateUrl: 'app/game/game.html',
      controller: 'gameCtrl'
    });
}]);
app.controller('mainCtrl', ['$scope', function($scope) {

}]);
app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'mainCtrl'
    });
}]);
app.factory('activityFactory', [function() {
  var activities = [
    {
      _id: 0,
      name: 'Flip Cup',
      videos: ['iQR51zpcnOQ', 'WexBdW2mlAs', '4wm0qt4d7ro'],
      description: 'Two players face each other on a table and flip cups. 3 cup minimum for each player, 4 if your name is Peng.',
      wikiLink: 'http://en.wikipedia.org/wiki/Flip_cup'
    },
    {
      _id: 1,
      name: 'Beer Pong',
      videos: ['JOYduGqZSRc', 'ijjDCaVYfjc', '8vDvtvryuUg', 'yZtRuxrQ5Ec'],
      description: '6 cup beer pong. Two balls per turn. Explosion, island, balls-back, and pull a cup if you overshoot are all cannon.',
      wikiLink: 'http://en.wikipedia.org/wiki/Beer_pong'
    },
    {
      _id: 2,
      name: 'Higher/Lower',
      videos: ['_XxrYPLam74', '6INCl9pIHRg'],
      description: 'Alternate every turn being the dealer. Keep the card if you guess right. Most cards after 10 draws wins.',
      wikiLink: ''
    }
  ];

  function drawActivity() {
    return activities[Math.floor(Math.random() * activities.length)];
  }

  function addActivity(activity) {
    activities.push(activity);
  }

  function removeActivity(activityId) {
    _.remove(activities, function(a) {
      return a._id == activityId;
    });
  }

  function editActivity(updatedActivity) {
    var oldActivity = _.find(activities, function(a) {
      return a._id == updatedActivity._id;
    });

    oldActivity.name = updatedActivity.name;
    oldActivity.videos = updatedActivity.videos;
    oldActivity.description = updatedActivity.description;
    oldActivity.wikiLink = updatedActivity.wikiLink;
  }

  return {
    get: drawActivity,
    add: addActivity,
    remove: removeActivity,
    edit: editActivity
  };
}]);
app.directive('youtube', function($window) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },

    template: '<div></div>',

    link: function(scope, element, attrs) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player(element.children()[0], {

          playerVars: {
            autoplay: 0,
            html5: 1,
            theme: "light",
            modestbranding: 1,
            color: "white",
            iv_load_policy: 3,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid
        });
      };

      scope.$watch('videoid', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }
        player.cueVideoById(scope.videoid);
      });

      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }
        player.setSize(scope.width, scope.height);
      });
    }
  };
});
app.factory('drinkFactory', [function() {
  var drinks = [
    {
      _id: 0,
      type: "Beer(s)"
    },
    {
      _id: 1,
      type: "Shot(s)"
    },
    {
      _id: 2,
      type: "Mixed Drink(s)"
    }
  ];

  var qtyPool = [0.5, 1, 1.5, 2];

  function getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function drawDrink() {
    var drink = getRand(drinks);
    drink.qty = getRand(qtyPool);
    return drink;
  }

  function addDrink(drink) {
    drinks.push(drink);
  }

  function removeDrink(drinkId) {
    _.remove(drinks, function(d) {
      return d._id == drinkId;
    });
  }

  function editDrink(updatedDrink) {
    var oldDrink = _.find(drinks, function(d) {
      return d._id == updatedDrink._id;
    });

    oldDrink.name = updatedDrink.type;
  }

  return {
    get: drawDrink,
    add: addDrink,
    remove: removeDrink,
    edit: editDrink
  };
}]);
app.filter('decimalToWord', function() {
  return function(num) {
    // 0, 1, 1.5, 2
    var numArr = num.toString().split("");

    if (numArr.length > 1) {
      
      // handle 0.5
      if (numArr[0] === "0") {
        return "half a";
      }

      // handle all other .5s
      if (_.last(numArr) === "5") {
        return numArr[0] + " and a half";
      }

    } else {
      return numArr.join(" ");
    }
  };
});
app.controller('navbarCtrl', ['$scope', function($scope) {

}]);