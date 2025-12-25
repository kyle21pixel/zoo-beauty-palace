import { Router } from 'express';
import { mockServices } from '../data/mockData';

const router = Router();

// Get all services
router.get('/', (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  
  let filtered = [...mockServices];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(s => s.category === category);
  }
  
  if (minPrice) {
    filtered = filtered.filter(s => s.price >= Number(minPrice));
  }
  
  if (maxPrice) {
    filtered = filtered.filter(s => s.price <= Number(maxPrice));
  }
  
  if (search) {
    const searchLower = String(search).toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(searchLower) ||
      s.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

// Get service by ID
router.get('/:id', (req, res) => {
  const service = mockServices.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({
      success: false,
      error: 'Service not found',
    });
  }
  
  res.json({
    success: true,
    data: service,
  });
});

// Create service
router.post('/', (req, res) => {
  const newService = {
    id: `s${mockServices.length + 1}`,
    ...req.body,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  mockServices.push(newService);
  
  res.status(201).json({
    success: true,
    data: newService,
    message: 'Service created successfully',
  });
});

// Update service
router.put('/:id', (req, res) => {
  const index = mockServices.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Service not found',
    });
  }
  
  mockServices[index] = {
    ...mockServices[index],
    ...req.body,
    updatedAt: new Date(),
  };
  
  res.json({
    success: true,
    data: mockServices[index],
    message: 'Service updated successfully',
  });
});

// Delete service
router.delete('/:id', (req, res) => {
  const index = mockServices.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Service not found',
    });
  }
  
  mockServices.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Service deleted successfully',
  });
});

export default router;
