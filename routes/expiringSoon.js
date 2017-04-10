var express = require('express');
var router = express.Router();

//make entire view private
router.use( function(req, res, next) {
if(!req.user){
  
  res.redirect('/login')
}
next();
  });
/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('expiringSoon', { title: 'Employees with cetificates expiring Soon', user: req.user });
});

module.exports = router;
