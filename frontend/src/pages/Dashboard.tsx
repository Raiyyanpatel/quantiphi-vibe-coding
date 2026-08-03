import React, { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { toast } from 'react-hot-toast';
import { LayoutDashboard, AlertTriangle } from 'lucide-react';
import {
  FoodLogForm,
  GoalToggle,
  CalorieProgressBar,
  MacroCard,
  MealHistory
} from '../components';

const Dashboard: React.FC = () => {
  const { summary, isLoading } = useDashboard();
  const [hasDismissedModal, setHasDismissedModal] = useState(false);

  // Reset the dismissed state if they go back below the limit
  useEffect(() => {
    if (summary && !summary.isExceeded) {
      setHasDismissedModal(false);
    }
    if (summary && summary.isExceeded && !hasDismissedModal) {
      toast.error('Daily Budget Exceeded!', { id: 'budget-exceeded' });
    }
  }, [summary?.isExceeded, hasDismissedModal]);

  if (isLoading || !summary) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="h-20 bg-gray-200 rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-40 bg-gray-200 rounded-3xl"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const showModal = summary.isExceeded && !hasDismissedModal;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Exceeded Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center transform scale-100 transition-all">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Budget Exceeded!</h3>
            <p className="text-gray-500 text-sm mb-6">
              You have exceeded your daily limit of {summary.calorieLimit} kcal by <span className="font-semibold text-red-600">{summary.totalCalories - summary.calorieLimit} kcal</span>.
            </p>
            <button
              onClick={() => setHasDismissedModal(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition duration-150"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              Daily Dashboard
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Track your nutrition and hit your macros.</p>
          </div>
          <div className="w-full md:w-auto">
            <GoalToggle />
          </div>
        </div>

        {/* Top Section: Progress & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col space-y-8">
            <CalorieProgressBar
              totalCalories={summary.totalCalories}
              calorieLimit={summary.calorieLimit}
              remainingCalories={summary.remainingCalories}
              isExceeded={summary.isExceeded}
              progress={summary.progress.calories}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MacroCard
                title="Protein"
                current={summary.totalProtein}
                target={summary.targets.protein}
                progress={summary.progress.protein}
                colorClass="bg-blue-500"
              />
              <MacroCard
                title="Carbs"
                current={summary.totalCarbs}
                target={summary.targets.carbs}
                progress={summary.progress.carbs}
                colorClass="bg-yellow-500"
              />
              <MacroCard
                title="Fats"
                current={summary.totalFats}
                target={summary.targets.fats}
                progress={summary.progress.fats}
                colorClass="bg-red-500"
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <FoodLogForm />
          </div>
        </div>

        {/* Bottom Section: History */}
        <MealHistory />

      </div>
    </div>
  );
};

export default Dashboard;
