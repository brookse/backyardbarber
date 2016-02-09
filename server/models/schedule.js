// schedule model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Schedule = new Schema({
  days: [],
  time: String
});

module.exports = mongoose.model('schedules', Schedule);
