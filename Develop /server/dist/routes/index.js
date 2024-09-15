import { Router } from 'express';
import authRoutes from './auth-routes.js';
import ticketRoutes from './api/ticket-routes.js'; // Import ticket routes
import userRoutes from './api/user-routes.js'; // Import user routes
import { authenticateToken } from '../middleware/auth.js'; // Import the middleware
const router = Router();
// Public routes
router.use('/auth', authRoutes);
// Protected routes
router.use('/tickets', authenticateToken, ticketRoutes);
router.use('/users', authenticateToken, userRoutes);
export default router;
