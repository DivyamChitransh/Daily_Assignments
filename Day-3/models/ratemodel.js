const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  name: { type: String },
});

module.exports = mongoose.model('Rate', rateSchema);
