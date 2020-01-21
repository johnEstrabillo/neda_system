const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userData = new Schema({
  idNumber: String,
  username: String,
  password: String,
  email: String,
  fullname: String

});


var user_data = mongoose.model('views_tbl_db', userData);

module.exports = user_data;
