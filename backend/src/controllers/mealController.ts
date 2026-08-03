import { Request, Response } from 'express';
import { MealService } from '../services/mealService';
import { sendSuccess, sendError } from '../utils/responseHelper';

export class MealController {
  public static getMeals(req: Request, res: Response) {
    const meals = MealService.getAllMeals();
    sendSuccess(res, meals);
  }

  public static createMeal(req: Request, res: Response) {
    try {
      const { name, weight } = req.body;

      // Validate input
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return sendError(res, 'Valid food name is required');
      }

      if (weight === undefined || typeof weight !== 'number' || weight <= 0) {
        return sendError(res, 'Valid portion weight (in grams) is required');
      }

      // Calculate and save the meal
      const newMeal = MealService.addMeal(name.trim(), weight);

      // Return the new calculated meal
      sendSuccess(res, newMeal, 'Meal logged successfully', 201);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  public static deleteMeal(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      
      if (!id) {
        return sendError(res, 'Meal ID is required');
      }

      MealService.deleteMeal(id);

      // Return the updated list of meals
      const updatedMeals = MealService.getAllMeals();
      sendSuccess(res, updatedMeals, 'Meal deleted successfully');
    } catch (error: any) {
      sendError(res, error.message, 404);
    }
  }
}
