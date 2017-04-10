var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;
// link to users table
let user = require('./models/users');
var index = require('./routes/index');
var employeeDashboard = require('./routes/employeeDashboard');
var certificatesDashboard = require('./routes/certificatesDashboard');
var expiringSoon = require('./routes/expiringSoon');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var conn = mongoose.connection;

var globals = require('./config/globals');
conn.open(globals.db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// main routes

app.use(passport.initialize());
app.use(passport.session());
// for configuring passport and session
app.use(session({
secret: 'some salt value here',
resave: true,
saveUninitialized: false
}));

app.use('/', index);
app.use('/employeeDashboard', employeeDashboard);
app.use('/certificatesDashboard', certificatesDashboard);
app.use('/expiringSoon', expiringSoon);




passport.use(user.createStrategy());
//for managing user login status
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: "Error"
  });
});

module.exports = app;
