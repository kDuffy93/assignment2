var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('expiringSoon', { title: 'Employees with cetificates expiring Soon' });
});

module.exports = router;
