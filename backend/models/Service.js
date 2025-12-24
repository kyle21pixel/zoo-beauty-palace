const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['wig-installation', 'braiding', 'barbering', 'nails', 'massage', 'tattooing', 'other'],
    required: [true, 'Service category is required']
  },
  description: {
    type: String,
    maxlength: 500
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Service duration is required']
  },
  price: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' }
  },
  images: [{
    url: String,
    caption: String
  }],
  requirements: [{
    type: String
  }],
  availability: {
    isAvailable: { type: Boolean, default: true },
    availableDays: [{
      day: String,
      hours: { start: String, end: String }
    }]
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  beautician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beautician'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);