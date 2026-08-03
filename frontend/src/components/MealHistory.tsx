import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Trash2, UtensilsCrossed } from 'lucide-react';

const MealHistory: React.FC = () => {
  const { meals, deleteMeal } = useDashboard();
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Daily History</h2>
      
      {meals.length === 0 ? (
        <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <UtensilsCrossed className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-semibold mb-1">No meals logged yet</h3>
          <p className="text-gray-500 text-sm max-w-sm">
            Start tracking your nutrition by logging your first meal using the form above!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Food Name</th>
                <th className="px-6 py-4 font-semibold text-right">Weight</th>
                <th className="px-6 py-4 font-semibold text-right">Calories</th>
                <th className="px-6 py-4 font-semibold text-right text-blue-600">Protein</th>
                <th className="px-6 py-4 font-semibold text-right text-yellow-600">Carbs</th>
                <th className="px-6 py-4 font-semibold text-right text-red-500">Fats</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {meals.map((meal) => (
                <tr key={meal.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900 capitalize">{meal.name}</td>
                  <td className="px-6 py-4 text-right text-gray-500">{meal.weight}g</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-800">{meal.calories}</td>
                  <td className="px-6 py-4 text-right text-gray-500">{meal.protein}g</td>
                  <td className="px-6 py-4 text-right text-gray-500">{meal.carbs}g</td>
                  <td className="px-6 py-4 text-right text-gray-500">{meal.fats}g</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => deleteMeal(meal.id)}
                      className="text-gray-400 p-2 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Delete meal"
                    >
                      <Trash2 className="w-4 h-4" />
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
