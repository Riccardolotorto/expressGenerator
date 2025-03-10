var express = require('express');
var router = express.Router();
var faker = require('faker');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(createFakePerson());
});


router.get('/generate', function(req, res, next) {
  res.send(createJson());
});

function createJson() {
  const fs = require('fs');
  let poet = {
  name: 'Mike',
  age: 23,
  gender: 'Male',
  department: 'English',
  car: 'Honda'
  };
  let data = JSON.stringify(poet);
  fs.writeFileSync('poets.json', data);
  return data
}

function createFakePerson()
  {
    let randomName = faker.name.findName(); // Rowan Nikolaus
    let randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    let randomCard = faker.helpers.createCard(); // random contact card containing many properties
    let randomImage = faker.image.avatar();
    let person = {
    name:randomName,
    email:randomEmail,
    card: randomCard,
    image: randomImage
  }
    return person;
  }

module.exports = router;