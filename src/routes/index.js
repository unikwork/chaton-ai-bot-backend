import { Router } from 'express';
const router = Router();

import openaiRoutes from './openai.routes.js';
router.use('/openai', openaiRoutes);

import categoryRoutes from './category.routes.js';
router.use('/category', categoryRoutes);

import verificationRoutes from './verification.routes.js';
router.use('/verification', verificationRoutes);

// exporting router
export default router;
