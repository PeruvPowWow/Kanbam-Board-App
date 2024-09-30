import { Router } from 'express';
import authRoutes from './auth-routes'; // This should work if auth-routes has a default export
import apiRoutes from './api/index'; 
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Use authentication routes
router.use('/auth', authRoutes);

// Apply authentication middleware for API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;
