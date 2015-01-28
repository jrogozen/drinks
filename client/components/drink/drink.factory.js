app.factory('drinkFactory', ['$resource', '$state', 'API_URL', function($resource, $state, API_URL) {
  var drinks = $resource(API_URL + '/drinks/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });

  var models = {
    drinks: [],
    drink: {}
  };

  var qtyPool = [0.5, 1, 1.5, 2];

  function getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getDrinks() {
    models.drinks.length = 0;
    return drinks.query(function(data) {
      _.each(data, function(curr, indx, arr) {
        curr.qty = getRand(qtyPool);
        models.drinks.push(curr);
      });
    });
  }

  function findDrink(drinkId) {
    models.drink.length = 0;
    return drinks.get({id: drinkId}, function(drink) {
      _.each(drink, function(value, key) {
        models.drink[key] = value;
      });
    });
  }

  function addDrink(drink) {
    if(drink._id) {
      return drinks.update(drink, function(data) {
        getDrinks();
      });
    } else {
      return drinks.save(drink, function(data) {
        models.drinks.push(data);
      });
    }
  }

  function removeDrink(drinkId) {
    drinks.delete({id: drinkId}, function() {
      for(var i=0; i < models.drinks.length; i++) {
        if(models.drinks[i]._id == drinkId) {
          models.drinks = models.drinks.splice(i, 1);
          break;
        }
      }
    });
  }

  getDrinks();

  return {
    get: getDrinks,
    find: findDrink,
    add: addDrink,
    remove: removeDrink,
    models: models
  };
}]);