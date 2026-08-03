import React from 'react';
import { Meal } from '../types';

interface MealHistoryProps {
  meals: Meal[];
  onDeleteMeal: (id: string) => void;
}

const MealHistory: React.FC<MealHistoryProps> = ({ meals, onDeleteMeal }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Daily History</h2>
      
      {meals.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
          No meals logged today. Log your first meal above!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Food Name</th>
                <th className="px-4 py-3 text-right">Weight</th>
                <th className="px-4 py-3 text-right">Calories</th>
                <th className="px-4 py-3 text-right text-blue-600">Protein</th>
                <th className="px-4 py-3 text-right text-yellow-600">Carbs</th>
                <th className="px-4 py-3 text-right text-red-500">Fats</th>
                <th className="px-4 py-3 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-4 font-medium text-gray-800 capitalize">{meal.name}</td>
                  <td className="px-4 py-4 text-right text-gray-500">{meal.weight}g</td>
                  <td className="px-4 py-4 text-right font-semibold text-gray-700">{meal.calories}</td>
                  <td className="px-4 py-4 text-right text-gray-500">{meal.protein}g</td>
                  <td className="px-4 py-4 text-right text-gray-500">{meal.carbs}g</td>
                  <td className="px-4 py-4 text-right text-gray-500">{meal.fats}g</td>
                  <td className="px-4 py-4 text-right">
                    <button 
                      onClick={() => onDeleteMeal(meal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete meal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MealHistory;
