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

  function getActivities() {
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
        getActivities();
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

  getActivities();

  return {
    get: getActivities,
    find: findActivity,
    add: addActivity,
    remove: removeActivity,
    models: models
  };
}]);