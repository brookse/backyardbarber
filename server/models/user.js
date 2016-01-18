// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  nickname: String,
  zipcode: Number,
  latitude: Number,
  longitude: Number,
  elevation: Number,
  batteryLevel: Number
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
