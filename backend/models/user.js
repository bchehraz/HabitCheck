const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastSave: {
    type: Number,
    required: false
  },
  habits: {
    type: Schema.Types.ObjectId,
    ref: 'HabitState'
  },
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'Preference'
  },
});

module.exports = mongoose.model('User', userSchema);
