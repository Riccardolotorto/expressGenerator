var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //Importo la libreria per la gestione degli errori
var countries = require('countryjs'); // Importa il modulo countryjs


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pages/:state/', function(req, res, next){
  //Se countryjs non trova il codice state allora ritorna una variabile undefined.
  //In questo caso richiamiamo la funzione next che passa l'errore al gestore degli errori
  //Il gestore degli errori è stato definito nell'app.js
  let stateCode = req.params.state; // Ottieni il codice dello stato dall'URL
  let stateInfo = countries.info(stateCode, "ISO2"); // Ottieni le informazioni sullo stato
  if (stateCode === "undefined") {
      return next(createError(422, 'OOPS! State not found'));
    }
    else
    {
      res.render('state', stateInfo);
    }
})

module.exports = router;
