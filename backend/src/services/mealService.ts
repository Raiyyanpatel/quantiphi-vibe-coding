import { Meal } from '../models/Meal';
import { mockFoodData } from '../utils/foodData';

let meals: Meal[] = [];

export class MealService {
  public static getAllMeals(): Meal[] {
    return [...meals].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public static addMeal(name: string, weight: number): Meal {
    // Find food in mock data (case-insensitive)
    const foodKey = Object.keys(mockFoodData).find(
      key => key.toLowerCase() === name.toLowerCase()
    );

    if (!foodKey) {
      throw new Error(`Food item '${name}' not found in database.`);
    }

    const baseData = mockFoodData[foodKey];
    const multiplier = weight / 100;

    const newMeal: Meal = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: baseData.name,
      weight,
      calories: Math.round(baseData.calories * multiplier),
      protein: Math.round(baseData.protein * multiplier * 10) / 10,
      carbs: Math.round(baseData.carbs * multiplier * 10) / 10,
      fats: Math.round(baseData.fats * multiplier * 10) / 10,
      timestamp: new Date().toISOString(),
    };

    meals.push(newMeal);
    return newMeal;
  }

  public static deleteMeal(id: string): void {
    const initialLength = meals.length;
    meals = meals.filter(meal => meal.id !== id);
    if (meals.length === initialLength) {
      throw new Error(`Meal with id '${id}' not found.`);
    }
  }
}
