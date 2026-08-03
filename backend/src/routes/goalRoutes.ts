import { Router } from 'express';
import { GoalController } from '../controllers/goalController';

const router = Router();

router.get('/', GoalController.getGoal);
router.put('/', GoalController.updateGoal);

export default router;
