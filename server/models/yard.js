// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Yard = new Schema({
  length: Number,
  width: Number,
  units: String,
  map: {},
  mowerSN: String
});

module.exports = mongoose.model('yards', Yard);
