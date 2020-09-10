const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UtilsSchema = new Schema({
  countries: Array,
  genres: Array
}, {versionKey: false});
const UtilsModel = mongoose.model('utils', UtilsSchema);
module.exports = UtilsModel;
