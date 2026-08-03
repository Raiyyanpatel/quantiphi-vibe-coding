import React, { useState } from 'react';
import api from '../services/api';
import { useDashboard } from '../context/DashboardContext';
import { toast } from 'react-hot-toast';
import { TrendingDown, Activity, TrendingUp } from 'lucide-react';

type FitnessGoal = 'weight_loss' | 'maintenance' | 'muscle_gain';

const GoalToggle: React.FC = () => {
  const { summary, fetchData } = useDashboard();
  const [activeGoal, setActiveGoal] = useState<FitnessGoal>(
    (summary?.activeGoal as FitnessGoal) || 'maintenance'
  );

  const handleGoalChange = async (goal: FitnessGoal) => {
    if (goal === activeGoal) return;
    
    // Optimistic UI update
    const previousGoal = activeGoal;
    setActiveGoal(goal);
    
    const loadingToast = toast.loading('Updating goal...');
    try {
      await api.put('/goals', { goal });
      toast.success('Goal updated successfully!', { id: loadingToast });
      fetchData(); // Notify parent to refresh summary data
    } catch (error) {
      console.error('Failed to update goal:', error);
      toast.error('Failed to update goal', { id: loadingToast });
      setActiveGoal(previousGoal); // Revert on failure
    }
  };

  const getButtonClass = (goal: FitnessGoal) => {
    const isActive = activeGoal === goal;
    return `flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-sm font-medium rounded-lg transition-all duration-200 active:scale-95 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-transparent text-gray-600 hover:bg-gray-200'
    }`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Goal</h2>
      
      {!summary ? (
        <div className="h-10 flex items-center justify-center text-gray-400 text-sm animate-pulse bg-gray-100 rounded-xl">
        </div>
      ) : (
        <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200 shadow-inner">
          <button 
            onClick={() => handleGoalChange('weight_loss')}
            className={getButtonClass('weight_loss')}
          >
            <TrendingDown className="w-4 h-4" />
            Loss
          </button>
          <button 
            onClick={() => handleGoalChange('maintenance')}
            className={getButtonClass('maintenance')}
          >
            <Activity className="w-4 h-4" />
            Maintain
          </button>
          <button 
            onClick={() => handleGoalChange('muscle_gain')}
            className={getButtonClass('muscle_gain')}
          >
            <TrendingUp className="w-4 h-4" />
            Gain
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalToggle;
