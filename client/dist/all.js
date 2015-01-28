var app = angular.module('drink', [
  'ui.router',
  'ngResource'
]);

app.constant('API_URL', 'http://localhost:8080/api');

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
}]);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};
  $httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
  
  $httpProvider.defaults.transformRequest = function(obj) {
    if (obj) {
      return $.param(obj, true);
    }
  };
});
app.controller('activitiesCtrl', ['$scope', '$stateParams', 'activityFactory', function($scope, $stateParams, activityFactory) {

  $scope.deleteActivity = function(activityId) {
    activityFactory.remove(activityId);
  };

  $scope.activities = activityFactory.models.activities;
  
}]);
app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('activities', {
      url: '/activities',
      abstract: true,
      templateUrl: 'app/activities/activities.html',
      controller: 'activitiesCtrl'
    })
    .state('activities.list', {
      url: '',
      templateUrl: 'app/activities/activities.list.html'
    })
    .state('activities.new', {
      url: '/new',
      templateUrl: 'app/activities/activities.new.html',
      controller: 'activityCtrl'
    })
    .state('activities.edit', {
      url: '/:id',
      templateUrl: 'app/activities/activities.new.html',
      controller: 'activityCtrl'
    })
    ;
}]);
app.controller('activityCtrl', ['$scope', '$state', '$stateParams', 'activityFactory', function($scope, $state, $stateParams, activityFactory) {

  if($stateParams.id) {
    activityFactory.find($stateParams.id);
    $scope.activity = activityFactory.models.activity;
  }

  $scope.addActivity = function(activity) {
    var sendActivity = activity;
    if (activity.videos && !activity._id) {
      activity.videos = activity.videos.split(",");
      activity.videos = _.map(activity.videos, function(video) {
        return $.trim(video);
      });
    }

    activityFactory.add(activity).$promise.then(function(data) {
      $state.go('activities.list');
    });
  };

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
app.factory('activityFactory', ['$resource', '$state', 'API_URL', function($resource, $state, API_URL) {

  var activities = $resource(API_URL + '/activities/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });

  var models = {
    activities: [],
    activity: {}
  };

  function drawActivity() {
    models.activities.length = 0;
    return activities.query(function(data) {
      _.each(data, function(curr, indx, arr) {
        models.activities.push(curr);
      });
    });
  }

  function findActivity(activityId) {
    models.activity.length = 0;
    return activities.get({id: activityId}, function(activity) {
      _.each(activity, function(value, key) {
        models.activity[key] = value;
      });
    });
  }

  function addActivity(activity) {
    if(activity._id) {
      //need to update
      return activities.update(activity, function(data) {
        drawActivity();
      });
    } else {
      //need to save
      return activities.save(activity, function(data) {
        models.activities.push(data);
      });
    }
  }

  function removeActivity(activityId) {
    activities.delete({id: activityId}, function() {
      for(var i=0; i < models.activities.length; i++) {
        if(models.activities[i]._id == activityId) {
          models.activities = models.activities.splice(i, 1);
          break;
        }
      }
    });
  }

  drawActivity();

  return {
    get: drawActivity,
    find: findActivity,
    add: addActivity,
    remove: removeActivity,
    models: models
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