import { Router } from 'express';
import { mockReviews } from '../data/mockData';

const router = Router();

// Get all reviews
router.get('/', (req, res) => {
  const { serviceId, beauticianId, providerId } = req.query;
  
  let filtered = [...mockReviews];
  
  if (serviceId) {
    filtered = filtered.filter(r => r.serviceId === serviceId);
  }
  
  if (beauticianId) {
    filtered = filtered.filter(r => r.beauticianId === beauticianId);
  }
  
  if (providerId) {
    filtered = filtered.filter(r => r.providerId === providerId);
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

// Create review
router.post('/', (req, res) => {
  const newReview = {
    id: `r${mockReviews.length + 1}`,
    ...req.body,
    helpful: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  mockReviews.push(newReview);
  
  res.status(201).json({
    success: true,
    data: newReview,
    message: 'Review created successfully',
  });
});

export default router;
