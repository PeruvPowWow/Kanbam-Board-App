import { Router } from 'express';
import authRoutes from './auth-routes'; // Remove .ts extension
import ticketRoutes from './ticket-routes'; // Remove .ts extension
import userRoutes from './user-routes'; // Remove .ts extension
import { authenticateToken } from '../middleware/auth'; // Correct import for middleware

const router = Router();


// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/tickets', authenticateToken, ticketRoutes);
router.use('/users', authenticateToken, userRoutes);

export default router;
