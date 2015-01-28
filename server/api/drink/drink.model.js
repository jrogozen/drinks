var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DrinkSchema = new Schema({
  type: String
});

module.exports = mongoose.model('Drink', DrinkSchema);