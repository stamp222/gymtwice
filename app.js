var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/students');
var strona = require('./routes/strona');
var jsdata = require('./routes/jsdata');
var labfourth = require('./routes/labfourth');
var labfourth = require('./routes/labfourth');
var labfifth = require('./routes/labfifth');

var app = express();

// cała obsługa logowania za pomocą Passport w osobnym module (utils/passport)
// https://stackoverflow.com/questions/32418963/how-to-use-multiple-router-files
var passport = require('./utils/passport');

passport(app);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//prawdopodobnie use wykonuja sie po kolei, jesli dalem ponizsza funkcje przed uzyciem powyzszych use'ow to moduly nie zdazyly
// sie wczytac i wysypalo strone, z drugiej strony jesli dalem ponizsza funkcje po app.use('/', index); i reszty to też się wysypało
// przy probie wejscie w odnosnik users powinno przeniesc do logowania a normalnie weszlo
app.use(function(req, res, next) {
  if(req.isAuthenticated()){
    //if user is looged in, req.isAuthenticated() will return true
    res.locals.logInfo = `Zalogowany: ${req.user.username}`;
    next();
  } else{
    res.locals.logInfo = `Niezalogowany`;
    // tu powinienem dodac reszte odnosnikow ktore nie wymagaja logowania
    if(req.url==='/' || req.url==='/sesja' || req.url==='/login' || req.url==='/users/reset' ) {
      next();
    } else {
      res.redirect("/login");
    }
  }
});


app.use('/', index);
app.use('/users', users);
app.use('/students', students);
app.use('/strona', strona);
app.use('/jsdata', jsdata);
app.use('/labfourth', labfourth);
app.use('/labfifth', labfifth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// warstwa pośrednia, która sprawdza uwierzytelnienie dla wszystkich adresów URL
// jeśli tak, to req.isAuthenticated() zwraca true - dodajemy info o zalogowaniu do naglówka
// jeśli nie to sprawdzamy czy strona jest dostępna dla niezalogowanych, jeśli nie
// to przekierowujemy do formularza logowania


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
