var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Obstacle = require('../models/obstacle.js');

/* Get all obstacles */
router.get('/:id', function(req, res) {
  Obstacle.find({mowerSN: req.params.id}, function(error, obstacles) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all obstacles"
      });
    }
    return res.status(200).json({
      status: 'obstacles found!',
      obstacles: obstacles
    });
  });
});

/* Create an obstacle */
router.post('/', function(req, res, next) {
  Obstacle.create({
    name: req.body.name,
    description: req.body.description,
    length: req.body.length,
    width: req.body.width,
    units: "inches",
    mowerSN: req.body.mowerSN
  }, function(error, obstacle) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error creating obstacle",
        obstacle: obstacle
      });
    }
    console.log('obstacle created!');
    return res.status(200).json({
      status: 'obstacle created!',
      obstacle: obstacle
    });
  });
});

/* Delete an obstacle */
router.delete('/:id', function(req, res) {
  Obstacle.remove(req.params.id, function(error, obstacle) {
    if(error) {
      console.log('error: ',error);
      return res.status(500).json({
        err: error,
        detail: "error deleting obstacle",
        obstacle: obstacle
      })
    }
    console.log('obstacle deleted!');
    return res.status(200).json({
      status: 'obstacle deleted!'
    });
  });
});

module.exports = router;
