import { Router } from 'express';
import { mockBookings } from '../data/mockData';

const router = Router();

// Get all bookings
router.get('/', (req, res) => {
  const { status, customerId, beauticianId, providerId } = req.query;
  
  let filtered = [...mockBookings];
  
  if (status) {
    filtered = filtered.filter(b => b.status === status);
  }
  
  if (customerId) {
    filtered = filtered.filter(b => b.customerId === customerId);
  }
  
  if (beauticianId) {
    filtered = filtered.filter(b => b.beauticianId === beauticianId);
  }
  
  if (providerId) {
    filtered = filtered.filter(b => b.providerId === providerId);
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

// Get booking by ID
router.get('/:id', (req, res) => {
  const booking = mockBookings.find(b => b.id === req.params.id);
  
  if (!booking) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found',
    });
  }
  
  res.json({
    success: true,
    data: booking,
  });
});

// Create booking
router.post('/', (req, res) => {
  const newBooking = {
    id: `b${mockBookings.length + 1}`,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  mockBookings.push(newBooking);
  
  res.status(201).json({
    success: true,
    data: newBooking,
    message: 'Booking created successfully',
  });
});

// Update booking
router.put('/:id', (req, res) => {
  const index = mockBookings.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found',
    });
  }
  
  mockBookings[index] = {
    ...mockBookings[index],
    ...req.body,
    updatedAt: new Date(),
  };
  
  res.json({
    success: true,
    data: mockBookings[index],
    message: 'Booking updated successfully',
  });
});

// Cancel booking
router.post('/:id/cancel', (req, res) => {
  const index = mockBookings.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Booking not found',
    });
  }
  
  mockBookings[index].status = 'cancelled';
  mockBookings[index].updatedAt = new Date();
  
  res.json({
    success: true,
    data: mockBookings[index],
    message: 'Booking cancelled successfully',
  });
});

export default router;
