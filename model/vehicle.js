const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var vehicleData = new Schema({
  brand: String,
  model: String,
  year: String,
});


var vehicle_data = mongoose.model('vehicle', vehicleData);

module.exports = vehicle_data;
