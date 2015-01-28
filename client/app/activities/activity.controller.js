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