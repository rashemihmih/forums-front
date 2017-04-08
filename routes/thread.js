let express = require('express');
let router = express.Router();

router.get('/:id/page:page', function (req, res, next) {
  res.locals.id = req.params.id;
  res.locals.page = parseInt(req.params.page);
  res.render('thread');
});

module.exports = router;
