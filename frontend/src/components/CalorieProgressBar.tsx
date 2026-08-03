import React from 'react';
import { Flame, AlertCircle } from 'lucide-react';

export interface CalorieProgressBarProps {
  totalCalories: number;
  calorieLimit: number;
  remainingCalories: number;
  isExceeded: boolean;
  progress: number;
}

const CalorieProgressBar: React.FC<CalorieProgressBarProps> = ({
  totalCalories,
  calorieLimit,
  remainingCalories,
  isExceeded,
  progress,
}) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col space-y-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Flame className={`w-4 h-4 ${isExceeded ? 'text-red-500' : 'text-blue-500'}`} />
            Calories Consumed
          </h2>
          <div className="flex items-baseline space-x-2">
            <span className={`text-6xl font-black tracking-tighter ${isExceeded ? 'text-red-500' : 'text-gray-900'}`}>
              {totalCalories}
            </span>
            <span className="text-gray-400 font-medium">/ {calorieLimit} kcal</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Remaining</h2>
          <span className={`text-3xl font-bold ${isExceeded ? 'text-red-500' : 'text-blue-600'}`}>
            {isExceeded ? '0' : remainingCalories}
          </span>
        </div>
      </div>

      <div className="relative w-full h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out rounded-full ${
            isExceeded ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {isExceeded && (
        <div className="flex items-center text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 mr-2" />
          You have exceeded your daily calorie limit by {totalCalories - calorieLimit} kcal.
        </div>
      )}
    </div>
  );
};

export default CalorieProgressBar;
