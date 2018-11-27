var express = require('express');
var router = express.Router();
const pug = require('pug');
var session = require('express-session')

router.use(session({
  secret: 'tajny kod', cookie: { maxAge: 60000 },
  resave: false, saveUninitialized: true,
}))

router.get('/', function(req, res, next) {
  var sesja = req.session;
  if(sesja.liczba) {
    sesja.liczba++;
  } else {
    sesja.liczba = 1;
    //sesja.cookie.expires = new Date(Date.now() + 900000);
    sesja.cookie.maxAge = 900000;
  }
  // sesja.save(); // zawsze ? czy wystarczy raz
  console.log(sesja.cookie);
  res.render('labfourth', {data: req.session});
});

module.exports = router;
