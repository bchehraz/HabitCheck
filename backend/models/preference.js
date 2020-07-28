const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
  darkMode: {
    type: Boolean,
    required: true
  },
  xEffectView: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Preference', preferenceSchema);
