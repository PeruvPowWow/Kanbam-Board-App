import express from 'express';
import { authenticateToken } from '../../middleware/auth'; // Use named import
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller'; // Assuming these are TypeScript files and the extension is omitted

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

export default router; // Export router as default

