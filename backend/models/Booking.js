const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  },
  beautician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beautician'
  },
  bookingType: {
    type: String,
    enum: ['on-route', 'on-site'],
    required: [true, 'Booking type is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  scheduledTime: {
    type: String, // Format: "HH:MM"
    required: [true, 'Scheduled time is required']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required']
  },
  location: {
    // For on-site bookings (client location)
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  providerLocation: {
    // For on-route bookings (provider location)
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: 500
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);