const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgressDataSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Email to identify user
  month: { type: String, required: true },
  count: { type: Number, required: true },
  type: { type: String, required: true } // reading, creating, or courses
});

module.exports = db.model('ProgressData', ProgressDataSchema);
