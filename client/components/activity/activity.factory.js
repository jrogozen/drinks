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