import { Router } from 'express';
import { mockUsers } from '../data/mockData';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  const { role } = req.query;
  
  let filtered = [...mockUsers];
  
  if (role) {
    filtered = filtered.filter(u => u.role === role);
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
});

// Create user
router.post('/', (req, res) => {
  const newUser = {
    id: `u${mockUsers.length + 1}`,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  mockUsers.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully',
  });
});

// Update user
router.put('/:id', (req, res) => {
  const index = mockUsers.findIndex(u => u.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }
  
  mockUsers[index] = {
    ...mockUsers[index],
    ...req.body,
    updatedAt: new Date(),
  };
  
  res.json({
    success: true,
    data: mockUsers[index],
    message: 'User updated successfully',
  });
});

export default router;
