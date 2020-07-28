const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const streakSchema = new Schema({
  streak: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Streak', streakSchema);
