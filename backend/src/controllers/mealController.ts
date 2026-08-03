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

      // Validate food name
      if (!name || typeof name !== 'string') {
        return sendError(res, 'Food name must be a valid string');
      }

      const trimmedName = name.trim();
      
      if (trimmedName.length < 2) {
        return sendError(res, 'Food name must be at least 2 characters long');
      }

      if (trimmedName.length > 50) {
        return sendError(res, 'Food name is too long (max 50 characters)');
      }

      const nameRegex = /^[a-zA-Z0-9\s\-']+$/;
      if (!nameRegex.test(trimmedName)) {
        return sendError(res, 'Food name can only contain letters, numbers, spaces, hyphens and apostrophes');
      }

      // Validate weight
      if (weight === undefined || typeof weight !== 'number') {
        return sendError(res, 'Weight must be a valid number');
      }

      if (weight <= 0) {
        return sendError(res, 'Weight must be greater than zero');
      }

      if (weight > 10000) {
        return sendError(res, 'Weight is unrealistically large (max 10,000g). Please check your entry.');
      }

      // Calculate and save the meal
      const newMeal = MealService.addMeal(trimmedName, weight);

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

  public static analyzeImage(req: Request, res: Response) {
    try {
      // Mock analyzing an uploaded image
      const mockResult = {
        name: 'Salmon',
        weight: 200
      };
      
      // Simulate slight network delay for effect
      setTimeout(() => {
        sendSuccess(res, mockResult, 'Image analyzed successfully');
      }, 800);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}
