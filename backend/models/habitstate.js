const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const habitStateSchema = new Schema({
  checked: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit'
  }],
  unchecked: [{
    type: Schema.Types.ObjectId,
    ref: 'Habit'
  }]
});

module.exports = mongoose.model('HabitState', habitStateSchema)
