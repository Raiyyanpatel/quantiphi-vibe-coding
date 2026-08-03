export interface FoodNutrition {
  name: string;
  calories: number; // per 100g
  protein: number;  // per 100g
  carbs: number;    // per 100g
  fats: number;     // per 100g
}

export const mockFoodData: Record<string, FoodNutrition> = {
  "Chicken Breast": { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  "Brown Rice": { name: "Brown Rice", calories: 112, protein: 2.6, carbs: 24, fats: 0.9 },
  "Broccoli": { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
  "Salmon": { name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13 },
  "Oats": { name: "Oats", calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9 },
  "Eggs": { name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11 },
  "Banana": { name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 },
  "Almonds": { name: "Almonds", calories: 579, protein: 21.1, carbs: 21.6, fats: 49.9 },
  "Sweet Potato": { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20.1, fats: 0.1 },
  "Avocado": { name: "Avocado", calories: 160, protein: 2, carbs: 8.5, fats: 14.7 },
  "Greek Yogurt": { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4 },
  "Olive Oil": { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fats: 100 },
  "Apple": { name: "Apple", calories: 52, protein: 0.3, carbs: 13.8, fats: 0.2 },
  "Spinach": { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  "Whey Protein": { name: "Whey Protein", calories: 359, protein: 80, carbs: 4, fats: 2 },
};
