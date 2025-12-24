const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'recipientModel',
    required: [true, 'Recipient is required']
  },
  recipientModel: {
    type: String,
    required: [true, 'Recipient model is required'],
    enum: ['User', 'Admin', 'Provider', 'Beautician', 'Client']
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    enum: ['User', 'Admin', 'Provider', 'Beautician', 'Client']
  },
  type: {
    type: String,
    required: [true, 'Notification type is required'],
    enum: [
      'booking_request',
      'booking_confirmed', 
      'booking_cancelled',
      'booking_completed',
      'booking_rescheduled',
      'payment_received',
      'payment_refunded',
      'review_received',
      'system_alert',
      'promotional',
      'reminder'
    ]
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: 100
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 500
  },
  data: {
    // Additional data related to the notification
    bookingId: mongoose.Schema.Types.ObjectId,
    serviceId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    date: Date
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'critical'],
    default: 'normal'
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, read: 1 });

// Instance method to mark notification as read
notificationSchema.methods.markAsRead = function() {
  this.read = true;
  this.readAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);