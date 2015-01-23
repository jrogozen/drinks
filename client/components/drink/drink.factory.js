app.factory('drinkFactory', [function() {
  var drinks = [
    {
      _id: 0,
      type: "Beer(s)"
    },
    {
      _id: 1,
      type: "Shot(s)"
    },
    {
      _id: 2,
      type: "Mixed Drink(s)"
    }
  ];

  var qtyPool = [0.5, 1, 1.5, 2];

  function getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function drawDrink() {
    var drink = getRand(drinks);
    drink.qty = getRand(qtyPool);
    return drink;
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