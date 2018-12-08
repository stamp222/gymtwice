var express = require('express');
var router = express.Router();
const pug = require('pug');
var session = require('express-session')
var JWT = require('jwt-async')

router.get('/', function(req, res, next) {
  var d = new Date("12/31/2018 23:59:59");
  var milisec = d.getTime();
  var jwt = new JWT();
  jwt.setSecret("tajnyklucz");
  var header = '{"typ":"JWT","alg":"HS256"}';
  var payload =
  '{"sub": "supersub","exp": milisec,"name":"Jacek Szyper","admin":true,\
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"}';
  jwt.sign(payload,function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });
  // console.log( JWT.base64urlEncode(header) );
  // console.log( JWT.base64urlEncode(payload) );
  res.render('labfifth', {jwt});
});

router.get('/token', function(req, res, next) {
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcInN1YlwiOiBcInN1cGVyc3ViXCIsXCJleHBcIjogbWlsaXNlYyxcIm5hbWVcIjpcIkphY2VrIFN6eXBlclwiLFwiYWRtaW5cIjp0cnVlLCAgXCJ1c2VySWRcIjogXCJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmRcIn0i.J1uxDmJa9GLa8Fzhpe9_b8YziMGmpkIN6WVcFGjm36U';
  var jwt = new JWT();
  jwt.setSecret("tajnyklucz");
  jwt.verify(token, function (err, data) { // weryfikujemy JWT
  if (err) console.log(err);
  console.log(data); // zdekodowany i zweryfikowany JWT w konsoli
  res.send(data);
  });


});

module.exports = router;
