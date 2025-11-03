import { Router } from 'express';
import { addApplication } from '../controllers/applicationControllers';
 
const router = Router();

router.post('/applications', addApplication)

export default router;