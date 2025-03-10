var express = require('express');
var router = express.Router();
var fs = require('fs');
var faker = require('faker');

let poets = generatePoets(10); // Genera poeti iniziali
fs.writeFileSync('poets.json', JSON.stringify(poets, null, 2));

router.get('/', function (req, res) {
  res.render('index', { poets });
});

router.get('/:id', function (req, res) {
  const poet = poets.find(p => p.id == req.params.id);
  if (!poet) return res.status(404).render('error', { message: 'Poeta non trovato' });
  res.render('poet', { poet });
});

// API: tutti i poeti
router.get('/api/all', (req, res) => {
  res.json(poets);
});

// API: singolo poeta
router.get('/api/:id', (req, res) => {
  const poet = poets.find(p => p.id == req.params.id);
  if (!poet) return res.status(404).json({ error: 'Poeta non trovato' });
  res.json(poet);
});

// API: solo immagini
router.get('/api-images/all', (req, res) => {
  const images = poets.map(p => ({ id: p.id, name: p.name, image: p.image }));
  res.json(images);
});

// API: rigenera poeti
router.get('/generate', (req, res) => {
  poets = generatePoets(10);
  fs.writeFileSync('poets.json', JSON.stringify(poets, null, 2));
  res.redirect('/');
});

function generatePoets(n) {
  const list = [];
  for (let i = 0; i < n; i++) {
    list.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      nationality: faker.address.country(),
      image: faker.image.avatar(),
      poems: Array.from({ length: 3 }, () => faker.lorem.paragraphs(1))
    });
  }
  return list;
}

module.exports = router;
