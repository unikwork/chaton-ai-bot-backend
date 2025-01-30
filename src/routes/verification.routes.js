import { Router } from 'express';
const router = Router();

import { subscriptionVerify }  from '../controllers/subscriptionVerify.js';

router.post('/subscription', subscriptionVerify);

export default router;
