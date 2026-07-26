const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { 
  validateUser, 
  validateUserId,
  sanitizeUserInput 
} = require('../middleware/validation');

// GET all users
router.get('/', userController.getAllUsers);

// GET single user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST create user
router.post('/', sanitizeUserInput, validateUser, userController.createUser);

// PUT update user
router.put('/:id', validateUserId, sanitizeUserInput, validateUser, userController.updateUser);

// DELETE user
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
