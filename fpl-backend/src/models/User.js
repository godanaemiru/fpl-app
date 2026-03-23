const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false }, // This controls the paywall
  fplId: { type: String }, // Optional: store their FPL team ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);