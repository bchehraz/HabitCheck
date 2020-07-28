const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Number,
    required: true
  },
  bestStreak: {
    type: Number,
    required: true
  },
  bestStreakDate: {
    type: Number,
    required: false
  },
  progress: [{
    type: Schema.Types.ObjectId,
    ref: 'Streak'
  }],
});

module.exports = mongoose.model('Habit', habitSchema);
