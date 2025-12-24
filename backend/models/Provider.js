const mongoose = require('mongoose');
const User = require('./User');

// Provider schema extending the base User schema
const providerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  businessLicense: {
    type: String,
    trim: true
  },
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
  servicesOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  workingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  serviceRadius: {
    type: Number, // in kilometers
    default: 10
  },
  portfolioImages: [{
    url: String,
    caption: String
  }]
}, {
  timestamps: true
});

// Create virtual field for full name
providerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Reference to the base User model
providerSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id'
});

module.exports = User.discriminator('Provider', providerSchema);