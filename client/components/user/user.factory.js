app.factory('userFactory', ['$resource', '$state', 'API_URL', function($resource, $state, API_URL) {

  var models = {
    users: []
  };

  // function getUsers() {
  //   return models.users;
  // }

  // function addUser(user) {
  //   user._id = models.user.length;
  //   return models.users.push(user);
  // }

  // function removeUser(userId) {
  //   for(var i=0; i < models.users.length; i++) {
  //     if(models.users[i]._id == userId) {
  //       models.users = models.users.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  // getUsers();

  return {
    // models: models,
    // get: getUsers,
    // add: addUser,
    // remove: removeUser
  };

}]);