const express = require("express");
const router = express.Router();
const Ninja = require('../models/ninja');

//Get a list of ninjas from the database
router.get('/ninjas', function(req, res, next){
  /*
  Ninja.find({}).then(function(ninjas){
    res.send(ninjas);
  });
  */

  Ninja.aggregate().near({
     near: {
      'type': 'Point',
      'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
     },
     maxDistance: 100000,
     spherical: true,
     distanceField: "dis"
  })﻿.then(function(ninjas){
        res.send(ninjas);
  }).catch(next);
});

//Add a new ninja to the database
router.post('/ninjas', function(req, res, next){
  //console.log(req.body);
  /*
  var ninja = new Ninja(req.body);
  ninja.save();
  */
  //Rewriting above two line in a single line code
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);

  /*
  res.send({
    type: 'POST',
    name: req.body.name,
    rank: req.body.rank
  });
  */
});

//Update a ninja in the database
router.put('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
});

//Delete a ninja from database
router.delete('/ninjas/:id', function(req, res, next){
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});



module.exports = router;
