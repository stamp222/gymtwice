var express = require('express');
var router = express.Router();
var db = require('../utils/db.js')
var mongoose = require('mongoose');
var students = [
 {"id": 0, "imie":"Marek", "nazwisko":"Nowak", "wiek": 23},
 {"id": 1, "imie":"Zofia", "nazwisko":"Zalewska", "wiek": 22},
 {"id": 2, "imie":"Tadeusz", "nazwisko":"Mostowski", "wiek": 24},
 {"id": 3, "imie":"Inga", "nazwisko":"Baran", "wiek": 23}
];
// mongoose.connect('mongodb://stamp222:mongoku2@ds245680.mlab.com:45680/mongojac');
/* GET home page. */
// var db = mongoose.connection;
var studentSchema = mongoose.Schema({
  imie: String,
  nazw: String,
  wiek: {type: Number, min: 1, max: 120, default: 25}
});

// var cwiczeniaSchema = mongoose.Schema({
//       name : String,
//       miesnie : [
//           String
//       ],
//       info : {
//           opis : String,
//           link : String
//       },
//       popularnosc : Number,
//       trudnosc : Number,
//       max : Number
// });

studentSchema.methods.speak = function() {
  var greeting = this.imie
    ? "Mew name is " + this.imie
    : "I dont have a name";
    console.log(greeting);
}
var StudentsModel = mongoose.model('students',studentSchema);
// var CwiczeniaModel = mongoose.model('cwiczenia',cwiczeniaSchema);

var janek = new StudentsModel({
  imie: "Zygfryd",
  nazw: "Kowalski",
  wiek: 22
});


db.on('error', console.error.bind(console,'connection error: '));
db.once('open',function() {
  console.log("uDało się");
});


router.get('/', function(req, res, next) {
  // console.log("asdfasdfasdfasdfasdfasdf");
  // res.send("asdfasdfasdfasdfasd");
  res.render('students',{});
});



//
router.get('/janek', function(req, res, next) {
  janek.save(function(err,janek) {
    if(err) return console.log(err);
    janek.speak();
  });
  res.send(JSON.stringify(janek));
});

router.get('/wyswietl', function(req, res, next) {
  StudentsModel.find(function(err, doc) {
    if(err) return console.error(err);
    res.json(doc);
  });
});

router.get('/znajdz/:id', function(req, res, next) {
  StudentsModel.findById(req.params.id, function(err, doc) {
    if(err) return console.error(err);
    console.log(doc);
    res.json(doc.imie);
  });
});
// // srednio dziala
// router.get('/cwiczenia', function(req, res, next) {
//   CwiczeniaModel.find(function(err, doc) {
//     if(err) return console.error(err);
//     console.log(doc);
//     res.json(doc);
//   });
// });

router.post('/stworz', function(req, res, next) {
  StudentsModel.create(req.body.name , function(err, doc) {
    if(err) return console.error(err);
    res.json(doc);
  });
});

router.put('/:id', function(req, res, next) {
  StudentsModel.findByIdAndUpdate(req.params.id, req.body, function(err, doc) {
    if(err) return console.error(err);
    res.json(doc);
  });
});

router.delete('/usun/:id', function(req, res, next) {
  StudentsModel.findByIdAndRemove(req.params.id, function(err, doc) {
    if(err) return console.error(err);
    res.json(doc);
  });
});

router.get('/wyswietlobiekt/:id', function(req, res, next) {
  var wiersz;
  for(var i=0; i<students.length; i++) {
    if(students[i].id == req.params.id) {
      wiersz = students[i];
      break;
    } else {
      wiersz = "Bledne id";
    }
  }
  res.send(wiersz);
});

module.exports = router;
