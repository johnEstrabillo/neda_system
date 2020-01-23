const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ownerData = new Schema({
  plate_no: String,
  lastname: String,
  firstname: String,
  brand: String,
  color: String,
  driver: String,
  remarks: String

});


var owner_data = mongoose.model('vehicle_owner', ownerData);

module.exports = owner_data;
