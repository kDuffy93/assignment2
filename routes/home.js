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
    let returnURL = req.session.returnURL || [] ;


  req.session.messages = [];
  req.session.messages1 = [];

  res.render('login', {
    title: 'Please Login',
    messages: messages,
    messages1: messages1,
    returnURL: returnURL,
    user: null
  });
  
});


// post @ login
router.post('/login', /* function(req, res, next) {
  returnURL = req.body.returnURL;
 console.log(returnURL+ "from post");
if(returnURL)
{

  console.log(returnURL+ "from if");
  passport.authenticate('local', {
  successRedirect: '/' + returnURL ,
  failureRedirect: '/login',
    failureMessage: 'Invalid Login'
  
  })

}
else
{
  
  console.log(returnURL + "from else");*/
  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
    failureMessage: 'Invalid Login'
  }));
//}
  
//});


router.get('/logout', function(req, res, next) {
req.logout();
 res.redirect('/');
})


module.exports = router;
