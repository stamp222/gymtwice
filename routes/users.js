var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users hello');
});

router.get('/hello', function(req, res, next) {
  res.send('users hello');
});

module.exports = router;
