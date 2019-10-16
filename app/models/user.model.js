const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String },
   emailId: { type: String, required: true },
   phone: { type: Number },
   createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});
module.exports = mongoose.model('User', UserSchema);
