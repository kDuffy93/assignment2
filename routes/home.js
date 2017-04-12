var express = require('express');
var router = express.Router();

let passport = require('passport');
let User = require('../models/users');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;






/* GET home page. */
router.get('/',   function(req, res, next) {
  

res.render('home', { title: 'Western Certificates Home',
user: req.user}); 
});


/* GET login */
router.get('/login', function(req, res, next) {

  let messages = req.session.messages || [];
  let messages1 = req.session.messages1 || [];
  
  
  req.session.messages = [];
  req.session.messages1 = [];
  res.render('login', {
    title: 'Please Login',
    messages: messages,
    messages1: messages1,
    user: null
  });
  
});


// post @ login
router.post('/login', passport.authenticate('local', {
  
  successRedirect: '/',
  failureRedirect: '/login',
    failureMessage: 'Invalid Login'
  }));


router.get('/logout', function(req, res, next) {
req.logout();
 res.redirect('/');
})


module.exports = router;
