const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AllSchema = new Schema({
  title: String,
  country: String,
  formedIn: Number,
  location: String,
  status: String,
  genre: String,
  lyricThemes: String,
  label: String,
  bio: String,
  discography: Array,
  pictures: Object,
  createdAt: Date,
  updatedAt: Date,
  socials: Object,
  currentLineUp: Array
}, {versionKey: false});
const AllModel = mongoose.model('da', AllSchema, 'da');
module.exports = AllModel;