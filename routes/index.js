let express = require('express');
let router = express.Router();

let session = require('../main/session');

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
