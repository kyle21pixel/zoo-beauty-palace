import { Router } from 'express';
import { serviceRepository } from '../repositories/ServiceRepository';

const router = Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    
    const services = await serviceRepository.findAll({
      category: category as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      search: search as string,
    });
    
    res.json({
      success: true,
      data: services,
      total: services.length,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
    });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await serviceRepository.findById(req.params.id);
    
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
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service',
    });
  }
});

// Create service
router.post('/', async (req, res) => {
  try {
    const newService = await serviceRepository.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newService,
      message: 'Service created successfully',
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service',
    });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await serviceRepository.update(req.params.id, req.body);
    
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    
    res.json({
      success: true,
      data: updatedService,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service',
    });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await serviceRepository.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service',
    });
  }
});

export default router;
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
