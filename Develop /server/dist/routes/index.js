import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Public routes (login/signup)
router.use('/auth', authRoutes);
// Protected routes (require authentication)
router.use('/api', authenticateToken, apiRoutes);
export default router;
