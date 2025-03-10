var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var faker = require('faker');
const fs = require('fs');

// Carica lista poeti salvata
let poets = JSON.parse(fs.readFileSync('./poets.json', 'utf8'));

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', poets });
});

/* GET poet detail page */
router.get('/pages/:poet', function(req, res, next){
  const poetID = parseInt(req.params.poet);
  const poet = poets.find(p => p.id === poetID);
  if (!poet) {
    return next(createError(404, 'Poeta non trovato'));
  }

  res.render('poeta', { person: poet });
});

module.exports = router;
