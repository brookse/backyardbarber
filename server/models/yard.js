// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var Yard = new Schema({
  length: Number,
  width: Number,
  units: String,
  obstacles: []
});

Yard.plugin(passportLocalMongoose);

module.exports = mongoose.model('yards', Yard);
