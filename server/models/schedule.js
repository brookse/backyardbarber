// schedule model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Schedule = new Schema({
  days: [],
  time: Number
});

module.exports = mongoose.model('schedules', Schedule);
