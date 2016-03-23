// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  nickname: String,
  zipcode: Number,
  latitude: {
    type: Number,
    default: 43.0441100
  },
  longitude: {
    type: Number,
    default: -87.9090520
  },
  elevation: {
    type: Number,
    default: 183.57
  },
  batteryLevel: {
    type: Number,
    default: 0
  },
  status: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
