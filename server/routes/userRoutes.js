var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js');

/* Register */
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, nickname: req.body.nickname, zipcode: req.body.zipcode }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'})
    });
  });
});

/* Login */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!', user: user})
    });
  })(req, res, next);
});

/* Logout */
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

/* Get all users in database */
router.get('/', function(req, res) {
  User.find({}, function(error, users) {
    if(error) {
      console.log('error:',error);
      return res.status(500).json({
        err: error,
        detail: "error fetching all obstacles"
      });
    }
    return res.status(200).json({
      status: 'users found!',
      obstacles: users
    });
  });
});

module.exports = router;
