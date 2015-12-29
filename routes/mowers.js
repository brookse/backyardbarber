var express = require('express');
var router = express.Router();
var Mower = require('./../models/mower_model');
var Promise = require('bluebird');

// Get all mowers in system
router.get('/', function(req, res, next) {
  Promise.all([
    Mower.fetchAll()
  ]).then(function(mower) {

    console.log('mower:',mower);
    res.status(200).json(mower);

  }).catch(function(error) {
    res.status(400).json({
      errors: {
        status: 400,
        title: 'Error when fetching all mowers',
        detail: error
      }
    });
  });
});

// Create a mower
router.post('/', function(req, res, next) {

});

// Get individual mower
router.get('/:id', function(req, res, next) {

});

// Delete a mower
router.delete('/:id', function(req, res, next) {

});

// Edit a mower
router.put('/:id', function(req, res, next) {

});

module.exports = router;
