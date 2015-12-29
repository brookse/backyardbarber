var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Session = require('../models/session_model');
var Mower = require('../models/mower_model');

router.get('/', function(req, res, next) {

});

router.post('/',function(req, res, next) {
  Promise.all([
    Mower.fetch({data: {serialNumber: req.body.data.attributes.serialNumber}}),
    Mower.validateCredentials({data: {serialNumber: req.body.data.attributes.serialNumber, passcode: req.body.data.attributes.passcode}})
  ]).then(function(mower) {
    res.status(200).json(Session.render(mower));
  }).catch(function(error) {
    res.status(400).json({
      errors: {
        status: 400,
        title: "Error logging in",
        detail: error
      }
    });
  });
});

module.exports = router;
