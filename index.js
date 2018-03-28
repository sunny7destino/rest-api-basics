const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express app
const app = express();

/*
app.get('/', function(req, res){
  console.log('Get request');
  //res.end();
  res.send({name:'Sunny'});
});
*/


//Connect to mongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

//Body middleware
app.use(bodyParser.json());

//Initialize routes
app.use('/api',routes);

//Error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err._message});
})

//Listen for request
app.listen(process.env.port || 4000, function(){
  console.log("Now listning for request");
});
