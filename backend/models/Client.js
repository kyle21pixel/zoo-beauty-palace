const mongoose = require('mongoose');
const User = require('./User');

// Client schema extending the base User schema
const clientSchema = new mongoose.Schema({
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  preferences: {
    favoriteProviders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider'
    }],
    favoriteBeauticians: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beautician'
    }],
    servicePreferences: [String],
    notificationSettings: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    }
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  favoriteServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  bookingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, {
  timestamps: true
});

// Create virtual field for full name
clientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Reference to the base User model
clientSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id'
});

module.exports = User.discriminator('Client', clientSchema);