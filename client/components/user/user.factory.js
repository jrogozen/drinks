app.factory('userFactory', [function() {
  var users = [
    {
      _id: 0,
      name: 'Jon'
    },
    {
      _id: 1,
      name: 'Parag'
    },
    {
      _id: 2,
      name: 'Daniel'
    },
    {
      _id: 3,
      name: 'Peng'
    }
  ];

  function allUsers() {
    return users;
  }

  return {
    get: allUsers
  };
}]);