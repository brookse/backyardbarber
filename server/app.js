// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

// mongoose
mongoose.connect('mongodb://localhost/backyardbarber');

// user schema/model
var User = require('./models/user.js');
var Obstacle = require('./models/obstacle.js');
var Schedule = require('./models/schedule.js');
var Yard = require('./models/yard.js');

// create instance of express
var app = express();

// require routes
var userRoutes = require('./routes/userRoutes.js');
var obstacleRoutes = require('./routes/obstacleRoutes.js');
var yardRoutes = require('./routes/yardRoutes.js');
var scheduleRoutes = require('./routes/scheduleRoutes.js');
var forecastRoutes = require('./routes/forecastRoutes.js');
var commRoutes = require('./routes/communicationRoutes.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', userRoutes);
app.use('/obstacles/', obstacleRoutes);
app.use('/yard/', yardRoutes);
app.use('/schedules/', scheduleRoutes);
app.use('/forecast/', forecastRoutes);
app.use('/communication/', commRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
