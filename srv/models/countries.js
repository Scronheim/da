const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CountriesSchema = new Schema({
  countries: Array
}, {versionKey: false});
const CountriesModel = mongoose.model('countries', CountriesSchema);
module.exports = CountriesModel;
