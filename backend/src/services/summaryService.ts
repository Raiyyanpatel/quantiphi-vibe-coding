import { MealService } from './mealService';
import { GoalService } from './goalService';

export class SummaryService {
  public static getDailySummary() {
    const meals = MealService.getAllMeals();
    const activeGoal = GoalService.getActiveGoal();

    // Define base limits depending on the goal
    let calorieLimit = 2000; // Maintenance
    let proteinTarget = 150;
    let carbsTarget = 200;
    let fatsTarget = 65;

    if (activeGoal === 'weight_loss') {
      calorieLimit = 1600;
      proteinTarget = 140;
      carbsTarget = 150;
      fatsTarget = 50;
    } else if (activeGoal === 'muscle_gain') {
      calorieLimit = 2500;
      proteinTarget = 180;
      carbsTarget = 300;
      fatsTarget = 80;
    }

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    meals.forEach(meal => {
      totalCalories += meal.calories;
      totalProtein += meal.protein;
      totalCarbs += meal.carbs;
      totalFats += meal.fats;
    });

    // Round everything to 1 decimal place to avoid floating point issues
    totalProtein = Math.round(totalProtein * 10) / 10;
    totalCarbs = Math.round(totalCarbs * 10) / 10;
    totalFats = Math.round(totalFats * 10) / 10;

    const remainingCalories = Math.max(0, calorieLimit - totalCalories);
    const isExceeded = totalCalories > calorieLimit;

    // Calculate progress percentages (max 100%)
    const caloriesProgress = Math.min(100, Math.round((totalCalories / calorieLimit) * 100));
    const proteinProgress = Math.min(100, Math.round((totalProtein / proteinTarget) * 100));
    const carbsProgress = Math.min(100, Math.round((totalCarbs / carbsTarget) * 100));
    const fatsProgress = Math.min(100, Math.round((totalFats / fatsTarget) * 100));

    return {
      activeGoal,
      calorieLimit,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
      remainingCalories,
      isExceeded,
      progress: {
        calories: caloriesProgress,
        protein: proteinProgress,
        carbs: carbsProgress,
        fats: fatsProgress
      },
      targets: {
        protein: proteinTarget,
        carbs: carbsTarget,
        fats: fatsTarget
      }
    };
  }
}
