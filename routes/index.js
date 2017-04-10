var express = require('express');
var router = express.Router();

let passport = require('passport');
let User = require('../models/users');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;


function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); // user is logged, so call the next function
   }
console.log('redirected from external function');
   res.redirect('/login'); // not logged in so redirect to home
}



/* GET home page. */
router.get('/', isLoggedIn,  function(req, res, next) {
  

res.render('index', { title: 'Dashboard',
user: req.user}); 
});


/* GET login */
router.get('/login', function(req, res, next) {

  let messages = req.session.messages || [];
  
  
  req.session.messages = [];
  res.render('login', {
    title: 'Please Login',
    messages: messages,
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
 res.redirect('/login');
})


module.exports = router;
