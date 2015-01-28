app.controller('activitiesCtrl', ['$scope', '$stateParams', 'activityFactory', function($scope, $stateParams, activityFactory) {

  $scope.deleteActivity = function(activityId) {
    activityFactory.remove(activityId);
  };

  $scope.activities = activityFactory.models.activities;
  
}]);