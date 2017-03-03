let express = require('express');
let router = express.Router();

let session = require('../public/javascripts/session.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = session.getLogin();
  if (user !== undefined) {
    alert(user);
  } else {
    res.render('index');
  }
});

module.exports = router;
