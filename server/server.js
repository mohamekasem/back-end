var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

//use the middleware, routes//

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);



//create the db

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/swag-shop';
var db = mongoose.connect(mongoURI,{ useMongoClient: true });
db = mongoose.connection

db.once('open',function () {
	console.log('mongoDB is open'); 
})
//run the server

var port = process.env.PORT || 8080
app.listen(port ,function () {
	console.log('listening at ' + port);
})
