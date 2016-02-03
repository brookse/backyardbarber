var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Forecast = require('forecast.io');

var options = {
  APIKey: "073cf3354939d590cc459bfa1f3e0a48"
},
forecast = new Forecast(options);

/* Get all obstacles */
router.get('/', function(req, res) {
  forecast.get(req.query.latitude, req.query.longitude, function(err, result, data) {
  //  console.log('r:',res)
    if(err) {
      console.log('error:',err);
      return res.status(500).json({
        err: err,
        detail: "error fetching forecast"
      });
    }
    return res.status(200).json({
      status: 'forecast found!',
      forecast: data
    });
  });

});

module.exports = router;
