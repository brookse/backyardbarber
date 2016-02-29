var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Schedule = require('../models/schedule.js');

/* Get all schedules */
router.get('/', function(req, res) {
  Schedule.find({}, function(error, schedules) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all schedules"
      });
    }
    return res.status(200).json({
      status: 'schedules found!',
      schedules: schedules
    });
  });
});

/* Create a schedule */
router.post('/', function(req, res, next) {
  console.log('rb:',req.body);
  Schedule.create({
    days: req.body.days,
    time: req.body.time
  }, function(error, schedule) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error creating schedule",
        schedule: schedule
      });
    }
    console.log('schedule created!');
    return res.status(200).json({
      status: 'schedule created!',
      schedule: schedule
    });
  });
});

/* Delete a schedule */
router.delete('/:id', function(req, res) {
  Schedule.remove({_id: req.params.id}, function(error) {
    if(error) {
      return res.status(500).json({
        err: error,
        detail: "error deleting schedule"
      })
    }
    Schedule.find({}, function(error, schedules) {
      if(error) {
        return res.status(500).json({
          err: error,
          detail: "error fetching all schedules"
        });
      }
      return res.status(200).json({
        status: 'schedules found!',
        schedules: schedules
      });
    });
  });
});

module.exports = router;
