var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: String,
  videos: Array,
  description: String,
  wikiLink: String
});

module.exports = mongoose.model('Activity', ActivitySchema);