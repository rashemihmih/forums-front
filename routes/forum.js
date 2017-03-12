let express = require('express');
let router = express.Router();

router.get('/:title', function (req, res, next) {
  res.locals.title = req.params.title;
  res.render('forum');
});

module.exports = router;
