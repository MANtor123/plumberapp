var express = require('express');
var jsonParser = require('body-parser');
var app = express();
var router = express.Router()
var exphbs = require('express-handlebars');
//var routes = require('./routes')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(jsonParser())

mongoose.connection.on("error", function(err) {
  console.log("Mongo error : ");
  console.log(err);
});

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/plumber";

mongoose.connect(mongoURL, function(err) {
  if (err) {
    console.log('Error Connecting to DB: ' + err);
  } else {
    console.log('connection to DB is successful');
  }
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))


var plumberSche = mongoose.model('plumberSche', {
  username: String,
  contact: Number,
  days: Array,
  slots: Array,
  hire: String
});

app.post('/api/plumbers', function(req, res) {
      var plumberData = req.body

      plumberSche.create({
        username: plumberData.username,
        contact: plumberData.contact,
        days: plumberData.days,
        slots: plumberData.slots,
        hire: plumberData.slots
      }, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            results
          })
        }
      });

      });

      app.get('/api/plumbers', function(req, res) {

        plumberSche.find({}, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              results: results
            })
          }
        });

      });



      app.post('/api/plumbers/slots/:slots/day/:slots', function(req, res) {

        var slots = req.params.slots

        plumberSche.find({
          slots: slots
        }, function(err, results) {
          if (err) {
            console.log(err);
          }
          res.json({
            results
          })
        })

      });

      app.get('/api/plumbers/:id/bookings', function(req, res) {
        var id = req.params.id



      });


      const port = process.env.PORT || 6001;
      app.use(function(err, req, res, next) {
        res.status(500).send(err.stack);
      })

      app.listen(port, function() {
        console.log('Example app listening at :' + port)
      });
