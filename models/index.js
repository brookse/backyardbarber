var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Mower schema/model creation
var Mower = mongoose.model('Mower', new Schema({
  serialNumber: String,
  passcode: String
}));

exports.mongoose = mongoose;
