app.factory('playerFactory', ['$q', '$resource', '$state', 'API_URL', function($q, $resource, $state, API_URL) {

  var models = {
    players: []
  };

  var count = 0;

  function getPlayers() {
    return models.players;
  }

  function addPlayer(player) {
    player._id = count;
    count ++;
    return models.players.push(player);
  }

  function removePlayer(playerId) {
    var deferred = $q.defer();

    
    /* enter remove player code here */

    return deferred.promise;
  }

  return {
    models: models,
    get: getPlayers,
    add: addPlayer,
    remove: removePlayer
  };

}]);