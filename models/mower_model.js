var Mower = require('./index').Mower;
var PasswordHash = require('password-hash');

module.exports = {

  fetch: function(params) {
    Mower.findOne({'serialNumber':params.data.serialNumber}, function(error, mower) {
      if(error) return console.log('Error getting mower ', params.data.serialNumber);
      console.log('Found a mower for ', params.data.serialNumber);
      return mower;
    })
  },

  fetchAll: function() {
    Mower.find({}).exec(function(error, mowers) {
      if(error) return console.log('Error getting all mowers');
      console.log('Found all mowers');
      return mowers
    });
  },

  create: function(params) {
    var newMower = new Mower({
      serialNumber: params.data.serialNumber,
      passcode: PasswordHash.generate(params.data.passcode)
    });

    newMower.save(function(error, mower) {
      if(error) return console.log('Error creating new mower');
      console.log('New Mower created: ', mower);
      return mower;
    });
  },

  update: function(params) {
    Mower.findOneAndUpdate(
      {serialNumber: params.data.serialNumber},
      {serialNumber: params.data.newSerialNumber},
      {new: true},
      function(error, newMower) {
        if(error) return console.log('Error updating mower ', params.data.serialNumber);
        console.log('Mower updated');
        return newMower;
      }
    );
  },

  delete: function(params) {
    Mower.remove({serialNumber: params.data.serialNumber}, function(error) {
      if(error) console.log('Error deleting mower');
    })
  },

  validateCredentials: function(params) {

  }
};
