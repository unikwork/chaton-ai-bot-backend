import { Router } from 'express';
const router = Router();

import { chatCompletions }  from '../controllers/openAICompletions.js';

router.post('/chat', chatCompletions);

export default router;
