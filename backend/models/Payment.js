const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking reference is required']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer', 'cash'],
    required: [true, 'Payment method is required']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  },
  beautician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beautician'
  },
  paymentIntentId: {
    type: String // For Stripe payments
  },
  receiptUrl: {
    type: String
  },
  paidAt: {
    type: Date
  },
  refundedAt: {
    type: Date
  },
  refundReason: {
    type: String,
    maxlength: 500
  },
  fees: {
    platformFee: { type: Number, default: 0 },
    processingFee: { type: Number, default: 0 },
    totalFees: { type: Number, default: 0 }
  },
  netAmount: {
    type: Number // Amount after fees
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate net amount
paymentSchema.pre('save', function(next) {
  if (this.amount && this.fees && this.fees.totalFees) {
    this.netAmount = this.amount - this.fees.totalFees;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);