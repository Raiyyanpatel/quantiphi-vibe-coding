import React from 'react';

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
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Calories Consumed</h2>
          <div className="flex items-baseline space-x-2">
            <span className={`text-5xl font-extrabold tracking-tight ${isExceeded ? 'text-red-500' : 'text-gray-900'}`}>
              {totalCalories}
            </span>
            <span className="text-gray-400 font-medium">/ {calorieLimit} kcal</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Remaining</h2>
          <span className={`text-2xl font-bold ${isExceeded ? 'text-red-500' : 'text-blue-600'}`}>
            {isExceeded ? '0' : remainingCalories}
          </span>
        </div>
      </div>

      <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out rounded-full ${
            isExceeded ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {isExceeded && (
        <div className="flex items-center text-red-500 text-sm font-medium">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          You have exceeded your daily calorie limit by {totalCalories - calorieLimit} kcal.
        </div>
      )}
    </div>
  );
};

export default CalorieProgressBar;
