var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var User = require('../utils/db.js')

router.get('/', function(req, res, next) {
  var links = `
    <h3>Adresy w aplikacji:</h3>
    <ul>
      <li><a href="/users/wyswietl">users</a> - dane o użytkownikach</li>
      <li><a href="/users/reset">users/reset</a> - resetowanie kolekcji użytowników, domyślnie ustawia dwóch użytkowników</li>
    </ul>
  `;
  res.send(links);
});

// lista wszystkich użytkowników w bazie
router.get('/wyswietl', function(req, res) {
  User.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    res.json(data);
  })
});

// resetowanie zawartości kolekcji użytkowników
router.get('/reset', function(req, res, next) {
  User.remove({}, function (err) {
    if (err) return handleError(err);
    var admin = new User({"username":"admin", "password":sha1("stud234"), "admin": true});
    var asdf = new User({"username":"asdf", "password":sha1("asdf") });
    // create two users: 'admin' and 'asdf'
    admin.save((err,data)=>{
      if (err) return console.error(err);
      asdf.save(function(err,data2) {
        if (err) return console.error(err);
        res.send("<h3>Utworzeni użytkownicy:</h3>" + data + " <br> " + data2);
      })
    });
  });
});

module.exports = router;
