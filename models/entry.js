// models/Entry.js
const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  idNumber: { type: String, required: true, minlength: 8 },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  adminComment: String, // Optional comment by admin
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // To store the admin who approved/denied
});

module.exports = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);
