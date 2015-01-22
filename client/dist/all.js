var app = angular.module('drink', [
  'ui.router',
  'ngMock'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
}]);
app.controller('gameCtrl', ['$scope', function($scope) {
  $scope.drinks = [1,2,3];
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
      videoId: '',
      description: 'Two players face each other on a table and flip cups. 3 cup minimum for each player, 4 if your name is Peng.',
      wikiLink: 'http://en.wikipedia.org/wiki/Flip_cup'
    },
    {
      _id: 1,
      name: 'Beer Pong',
      videoId: '',
      description: '6 cup beer pong. Two balls per turn. Explosion, island, balls-back, and pull a cup if you overshoot are all cannon.',
      wikiLink: 'http://en.wikipedia.org/wiki/Beer_pong'
    },
    {
      _id: 2,
      name: 'Higher/Lower',
      videoId: '',
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
    oldActivity.videoId = updatedActivity.videoId;
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
app.factory('drinkFactory', [function() {
  var drinks = [
    {
      _id: 0,
      type: "Beer"
    },
    {
      _id: 1,
      type: "Shot"
    },
    {
      _id: 2,
      type: "Mixed Drink"
    }
  ];

  function drawDrink() {
    return drinks[Math.floor(Math.random() * drinks.length)];
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