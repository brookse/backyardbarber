// schedule model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Schedule = new Schema({
  days: [],
  time: {
    hour: Number,
    minute: Number,
    ampm: String
  },
  mowerSN: String
});

module.exports = mongoose.model('schedules', Schedule);
