import { Router } from 'express';
import authRoutes from './auth-routes';
import ticketRoutes from './ticket-routes';
import userRoutes from './user-routes';
import authenticateToken from '../middleware/auth'; // Ensure this path is correct

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/tickets', authenticateToken, ticketRoutes);
router.use('/users', authenticateToken, userRoutes);

export default router;
