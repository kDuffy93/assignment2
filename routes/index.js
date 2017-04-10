var express = require('express');
var router = express.Router();

let passport = require('passport');
let User = require('../models/users');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  let User = req.user;
  if(!User)
  {
res.render('index', { title: 'Dashboard' });
  }
  else{
    res.redirect('/login');
  }
  
});


/* GET login */
router.get('/login', function(req, res, next) {
  let messages = req.session.messages || [];
  
  req.session.messages = [];
  res.render('login', {
    title: 'Please Login',
    messages: messages
      
  });
});


// post @ login
router.post('/login', passport.authenticate('local', {
  
  successRedirect: '/',
  failureRedirect: '/login',
    failureMessage: 'Invalid Login',

}));


router.get('/logout', function(req, res, next) {
req.logout();
 res.redirect('/login');
})


module.exports = router;
