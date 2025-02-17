var express = require('express'); // Carica il modulo express
var router = express.Router(); // Ottiene un oggetto router
var countries = require('countryjs'); // Importa il modulo countryjs

router.get('/info/:state', function (req, res, next) {
    let stateCode = req.params.state; // Ottieni il codice dello stato dall'URL
    let stateInfo = countries.info(stateCode, "ISO2"); // Ottieni le informazioni sullo stato

    if (stateInfo) {
        res.json(stateInfo); // Restituisci le informazioni in formato JSON
    } else {
        res.status(404).json({ error: "Stato non trovato" }); // Messaggio di errore se il codice non è valido
    }
});

module.exports = router;
