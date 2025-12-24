// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route files
const adminRoutes = require('./adminRoutes');
const providerRoutes = require('./providerRoutes');
const beauticianRoutes = require('./beauticianRoutes');
const clientRoutes = require('./clientRoutes');
const serviceRoutes = require('./serviceRoutes');
const bookingRoutes = require('./bookingRoutes');
const reviewRoutes = require('./reviewRoutes');
const paymentRoutes = require('./paymentRoutes');

// Use individual route files
router.use('/admin', adminRoutes);
router.use('/providers', providerRoutes);
router.use('/beauticians', beauticianRoutes);
router.use('/clients', clientRoutes);
router.use('/services', serviceRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;