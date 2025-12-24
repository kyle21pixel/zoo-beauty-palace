const mongoose = require('mongoose');
const User = require('./User');

// Admin schema extending the base User schema
const adminSchema = new mongoose.Schema({
  // Admin-specific fields can be added here
  permissions: [{
    type: String,
    enum: [
      'manage_users', 
      'manage_services', 
      'view_analytics', 
      'manage_bookings',
      'manage_payments',
      'system_settings'
    ]
  }],
  department: {
    type: String,
    trim: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Create virtual field for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Reference to the base User model
adminSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id'
});

module.exports = User.discriminator('Admin', adminSchema);