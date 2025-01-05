const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const followerSchema = new Schema({
  email: { type: String, required: true, unique: true }, // The user's email
  following: [{ type: String }], // Emails of users being followed
  followers: [{ type: String }]  // Emails of users who are following
});




module.exports = db.model('Followers', followerSchema);
