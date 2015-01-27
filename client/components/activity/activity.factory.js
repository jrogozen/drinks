app.factory('activityFactory', ['$resource', 'API_URL', function($resource, API_URL) {

  var activities = $resource(API_URL + '/activities/:id', {}, {
    update: {
      method: 'PUT'
    }
  });

  function drawActivity() {
    return activities.query();
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