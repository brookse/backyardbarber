var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Yard = require('../models/yard.js');

/* Get all yards */
router.get('/', function(req, res) {
  Yard.find({}, function(error, yards) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all yards"
      });
    }
    return res.status(200).json({
      status: 'yards found!',
      yards: yard
    });
  });
});

/* Create a yard */
router.post('/', function(req, res, next) {
  Yard.create({
    length: req.body.length,
    width: req.body.width,
    units: req.body.units,
    obstacles: req.body.obstacles
  }, function(error, yard) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error creating yard",
        yard: yard
      });
    }
    console.log('yard created!');
    return res.status(200).json({
      status: 'yard created!',
      yard: yard
    });
  });
});

/* Delete a yard */
router.delete('/:id', function(req, res) {
  Yard.remove(req.params.id, function(error, yard) {
    if(error) {
      console.log('error: ',error);
      return res.status(500).json({
        err: error,
        detail: "error deleting yard",
        yard: yard
      })
    }
    console.log('yard deleted!');
    return res.status(200).json({
      status: 'yard deleted!'
    });
  });
});

module.exports = router;
