import { Router } from 'express';
import { userRepository } from '../repositories/UserRepository';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const users = await userRepository.findAll(role as string);
    
    res.json({
      success: true,
      data: users,
      total: users.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    
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
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
    });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const newUser = await userRepository.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
    });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userRepository.update(req.params.id, req.body);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
    });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await userRepository.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
    });
  }
});

export default router;
