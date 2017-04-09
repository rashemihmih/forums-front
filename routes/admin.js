let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin');
});

router.get('/login', function (req, res, next) {
  res.render('adminLogin');
});

module.exports = router;
