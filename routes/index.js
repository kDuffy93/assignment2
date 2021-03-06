var express = require('express');
var router = express.Router();
// require passport for authentication on all routes in the index
let passport = require('passport');
let User = require('../models/users');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

router.use( function(req, res, next) {
if(req.user.changepassword == true){
  res.redirect('/firstlogin')
}
next();
  });
// authenticates all routes in this view
function isLoggedIn(req, res, next) {
  // user is logged, so call the next function
  if (req.isAuthenticated()) {
     return next(); // user is logged, so call the next function

  }


console.log('redirected from external function');
req.session.messages =["You must be logged-in to view this page"];
  req.session.messages1 = ["please enter you're credentials below"];
   res.redirect('/login'); // not logged in so redirect to home
}



/* GET home page. */
router.get('/', isLoggedIn,  function(req, res, next) {


  res.render('index', { title: 'Dashboard',
  user: req.user});


});




module.exports = router;
