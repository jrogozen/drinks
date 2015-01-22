app.factory('drinkFactory', [function() {
  var drinks = [
    {
      _id: 0,
      type: "Beer"
    },
    {
      _id: 1,
      type: "Shot"
    },
    {
      _id: 2,
      type: "Mixed Drink"
    }
  ];

  function drawDrink() {
    return drinks[Math.floor(Math.random() * drinks.length)];
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