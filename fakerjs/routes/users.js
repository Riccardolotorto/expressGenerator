var express = require('express');
var router = express.Router();
var faker = require('faker'); 

function createFakePerson()
{
  let randomName = faker.name.findName(); // Rowan Nikolaus
  let randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  let randomCard = faker.helpers.createCard(); // random contact card containing many properties
  let person = {
    name:randomName,
    email:randomEmail,
    card: randomCard
  }
  return person;
}

function fakePersonArray(arrayLenght) 
{
  let array = [];
  for (let i = 0; i < arrayLenght; i++) {
    array.push(createFakePerson());
    console.log(array[i]);
  }
  return array;
}

allpoets = fakePersonArray(10);

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index', {
  title: 'Users',
  poets: allpoets //Passa il vettore alla pagina index.pug
  });
});

router.get('/:poet_username', (req, res) => { 
  const poetUsername = req.params.poet_username;
  for (i = 0; i < allpoets.length; i++) {
    if (allpoets[i].card.username == poetUsername) {
      var poet = allpoets[i];
    } }
  if (poet != null) {
    res.render('poet', {
      title: poet.name,
      poet: poet
    });
  } else {
    res.status(404).send('poet not found');
  }

});


module.exports = router;