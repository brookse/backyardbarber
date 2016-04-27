var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Yard = require('../models/yard.js');

/* Get all yards */
router.get('/:id', function(req, res) {
  Yard.find({mowerSN: req.params.id}, function(error, yards) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all yards"
      });
    }
    return res.status(200).json({
      status: 'yards found!',
      yards: yards
    });
  });
});

/* Create a yard */
router.post('/', function(req, res, next) {
  Yard.create({
    length: req.body.yardData.length,
    width: req.body.yardData.width,
    units: req.body.yardData.units,
    map: req.body.yardData.map,
    mowerSN: req.body.yardData.mowerSN
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

router.put('/', function(req, res) {
  Yard.findOneAndUpdate({
    mowerSN: req.body.yardData.mowerSN  // conditions
  }, {
    map: req.body.yardData.map   // update
  },
  {new: true},  // options
  function(error, yard) {   // callback
    if(error) {
      console.log('error: ',error);
      return res.status(500).json({
        err: error,
        detail: "error updating yard",
        yard: yard
      })
    }
    console.log('yard updated!');
    return res.status(200).json({
      status: 'yard updated!'
    });
  })
})

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
