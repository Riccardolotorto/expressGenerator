var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ciaone', function(req, res, next) {
  res.send('PRONTONE!!');
});

module.exports = router;
