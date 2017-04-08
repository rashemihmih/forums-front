let express = require('express');
let router = express.Router();

router.get('/:title/page:page', function (req, res, next) {
  res.locals.title = req.params.title;
  res.locals.page = parseInt(req.params.page);
  res.render('forum');
});

router.get('/:forum/new', function (req, res, next) {
  res.locals.forum = req.params.forum;
  res.render('createThread');
});

module.exports = router;
