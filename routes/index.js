var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require('../utils/db.js')
var sha1 = require('sha1');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('content', { title: 'Express' });
});

// wyświetlanie formularza do logowania
router.get('/login', function(req, res) {
  res.render('login');
});

// logowanie użytkownika
// poprawne logowanie - przekierowanie na stronę główną
// brak uwierzytelnienia - przekierowanie na strone logowania
router.post('/login',
  passport.authenticate('local',
    { session: true,
      successRedirect: '/',
      failureRedirect: '/login' }
  )
);

router.get('/login2', function(req, res) {
  res.render('login');
});

// wylogowanie i przekierowanie na stronę główną
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// informacje o sesji użytkownika
router.get('/sesja', function(req, res, next) {
  if(req.session.odwiedziny) {
    req.session.odwiedziny++;
  } else {
    req.session.odwiedziny = 1;
  }
  var dane = {
    idSesji: req.session.id,
    odwiedziny: req.session.odwiedziny,
    ciasteczko: req.session.cookie,
    data: req.session.cookie.data,
    passport: req.session.passport
  };
  res.render('sesja', dane);
});


// inforamcja o kilku obiektach przechowujących dane zalogowanego użytkownika
router.get('/zalogowany', function(req, res) {
  var dane = {
    user: req.user,
    passport: req.session.passport,
    log_info: res.locals.logInfo
  };
  res.render('zalogowany', dane);
});

module.exports = router;
