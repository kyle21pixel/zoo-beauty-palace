import { Router } from 'express';
import { bookingRepository } from '../repositories/BookingRepository';

const router = Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const { status, customerId, beauticianId, providerId } = req.query;
    const bookings = await bookingRepository.findAll({
      status: status as string,
      customerId: customerId as string,
      beauticianId: beauticianId as string,
      providerId: providerId as string,
    });
    res.json({ success: true, data: bookings, total: bookings.length });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await bookingRepository.findById(req.params.id);
    
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
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking',
    });
  }
});

// Create booking
router.post('/', async (req, res) => {
  try {
    const newBooking = await bookingRepository.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
    });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await bookingRepository.update(req.params.id, req.body);
    
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    res.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update booking',
    });
  }
});

// Cancel booking
router.post('/:id/cancel', async (req, res) => {
  try {
    const cancelledBooking = await bookingRepository.cancel(req.params.id);
    
    if (!cancelledBooking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    res.json({
      success: true,
      data: cancelledBooking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel booking',
    });
  }
});

// Get booking statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const { providerId, startDate, endDate } = req.query;
    
    const stats = await bookingRepository.getStatistics({
      providerId: providerId as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching booking statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking statistics',
    });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await bookingRepository.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete booking',
    });
  }
});

export default router;
