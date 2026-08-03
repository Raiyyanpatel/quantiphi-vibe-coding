import React, { useEffect, useState } from 'react';
import api from '../services/api';

type FitnessGoal = 'weight_loss' | 'maintenance' | 'muscle_gain';

interface GoalToggleProps {
  onGoalChanged: () => void;
}

const GoalToggle: React.FC<GoalToggleProps> = ({ onGoalChanged }) => {
  const [activeGoal, setActiveGoal] = useState<FitnessGoal>('maintenance');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await api.get('/goals');
        if (response.data.success) {
          setActiveGoal(response.data.data.activeGoal);
        }
      } catch (error) {
        console.error('Failed to fetch goal:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoal();
  }, []);

  const handleGoalChange = async (goal: FitnessGoal) => {
    if (goal === activeGoal) return;
    
    // Optimistic UI update
    const previousGoal = activeGoal;
    setActiveGoal(goal);
    
    try {
      await api.put('/goals', { goal });
      onGoalChanged(); // Notify parent to refresh summary data
    } catch (error) {
      console.error('Failed to update goal:', error);
      setActiveGoal(previousGoal); // Revert on failure
    }
  };

  const getButtonClass = (goal: FitnessGoal) => {
    const isActive = activeGoal === goal;
    return `flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-transparent text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Goal</h2>
      
      {isLoading ? (
        <div className="h-10 flex items-center justify-center text-gray-400 text-sm">
          Loading...
        </div>
      ) : (
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => handleGoalChange('weight_loss')}
            className={getButtonClass('weight_loss')}
          >
            Weight Loss
          </button>
          <button 
            onClick={() => handleGoalChange('maintenance')}
            className={getButtonClass('maintenance')}
          >
            Maintenance
          </button>
          <button 
            onClick={() => handleGoalChange('muscle_gain')}
            className={getButtonClass('muscle_gain')}
          >
            Muscle Gain
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalToggle;
