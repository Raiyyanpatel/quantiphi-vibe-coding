import { Router } from 'express';
import { MealController } from '../controllers/mealController';

const router = Router();

router.get('/', MealController.getMeals);
router.post('/', MealController.createMeal);
router.delete('/:id', MealController.deleteMeal);

export default router;
