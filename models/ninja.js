const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});


//Create ninja Schema & model
const ninjaSchema = new Schema({
  name:{
    type:String,
    required:[true, 'Name field is required']
  },
  rank:{
    type:String
  },
  available:{
    type:Boolean,
    default:false
  },
  geometry: GeoSchema
});


const Ninja = mongoose.model('ninja', ninjaSchema);

module.exports = Ninja;
