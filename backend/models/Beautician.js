const mongoose = require('mongoose');
const User = require('./User');

// Beautician schema extending the base User schema
const beauticianSchema = new mongoose.Schema({
  specialization: [{
    type: String,
    enum: ['wig-installation', 'braiding', 'barbering', 'nails', 'massage', 'tattooing', 'other']
  }],
  certifications: [{
    name: String,
    issuingOrganization: String,
    dateObtained: Date,
    validUntil: Date
  }],
  experience: {
    years: Number,
    description: String
  },
  serviceAreas: [{
    type: String
  }],
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
  travelRadius: {
    type: Number, // in kilometers
    default: 20
  },
  portfolioImages: [{
    url: String,
    caption: String
  }],
  bio: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Create virtual field for full name
beauticianSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Reference to the base User model
beauticianSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id'
});

module.exports = User.discriminator('Beautician', beauticianSchema);