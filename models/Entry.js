const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: {
    type: Date,
    default: Date()
  },
  sleep: {
    hours: Number,
    quality: { type: Boolean, default: false }
  },
  med_morning: { type: Boolean, default: false },
  med_evening: { type: Boolean, default: false },
  counselling: { type: Boolean, default: false },
  classes: { type: Boolean, default: false },
  homework: { type: Boolean, default: false },
  worked_out: { type: Boolean, default: false },
  prayed: { type: Boolean, default: false },
  diet: {
    meals: Number,
    caffeine: Number,
    healthy: { type: Boolean, default: true },
  },
  digestion: { type: Boolean, default: false },
  social: {
    hangout_friends: { type: Boolean, default: false },
    contact_friends: { type: Boolean, default: false },
    contact_mom: { type: Boolean, default: false },
    contact_family: { type: Boolean, default: false },
  },
  feeling: {
    sad: { type: Boolean, default: false },
    anxious: { type: Boolean, default: false },
    moody: { type: Boolean, default: false },
    strong: { type: Boolean, default: false },
    good: { type: Boolean, default: false },
    ok: { type: Boolean, default: false },
  },
  stress_level: String,
  health: String,
  forward_to: String,
  concerns: String,
},{ timestamps: true });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
