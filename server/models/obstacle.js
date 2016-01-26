// obstacle model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Obstacle = new Schema({
  name: String,
  description: String,
  length: Number,
  width: Number,
  units: String
});

module.exports = mongoose.model('obstacles', Obstacle);
