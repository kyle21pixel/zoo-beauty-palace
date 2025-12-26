import { Router } from 'express';
import { reviewRepository } from '../repositories/ReviewRepository';

const router = Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const { customerId, serviceId, beauticianId, providerId, minRating, maxRating } = req.query;
    const reviews = await reviewRepository.findAll({
      customerId: customerId as string,
      serviceId: serviceId as string,
      beauticianId: beauticianId as string,
      providerId: providerId as string,
      minRating: minRating ? Number(minRating) : undefined,
      maxRating: maxRating ? Number(maxRating) : undefined,
    });
    res.json({ success: true, data: reviews, total: reviews.length });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await reviewRepository.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }
    
    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch review',
    });
  }
});

// Create review
router.post('/', async (req, res) => {
  try {
    const newReview = await reviewRepository.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newReview,
      message: 'Review created successfully',
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create review',
    });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await reviewRepository.update(req.params.id, req.body);
    
    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }
    
    res.json({
      success: true,
      data: updatedReview,
      message: 'Review updated successfully',
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update review',
    });
  }
});

// Mark review as helpful
router.post('/:id/helpful', async (req, res) => {
  try {
    const review = await reviewRepository.incrementHelpful(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }
    
    res.json({
      success: true,
      data: review,
      message: 'Review marked as helpful',
    });
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark review as helpful',
    });
  }
});

// Get provider statistics
router.get('/stats/provider/:providerId', async (req, res) => {
  try {
    const stats = await reviewRepository.getProviderStatistics(req.params.providerId);
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching provider statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch provider statistics',
    });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await reviewRepository.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Review not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete review',
    });
  }
});

export default router;
