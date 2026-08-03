import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import type { Meal } from '../types';

interface SummaryData {
  activeGoal: string;
  calorieLimit: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  remainingCalories: number;
  isExceeded: boolean;
  progress: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  targets: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface DashboardContextType {
  meals: Meal[];
  summary: SummaryData | null;
  isLoading: boolean;
  fetchData: () => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const [mealsRes, summaryRes] = await Promise.all([
        api.get('/meals'),
        api.get('/summary')
      ]);
      setMeals(mealsRes.data.data);
      setSummary(summaryRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      // Optimistically update the UI for faster perceived performance
      setMeals(prev => prev.filter(m => m.id !== id));
      await api.delete(`/meals/${id}`);
      toast.success('Meal deleted');
      // Re-fetch summary to ensure accurate limits and macro progress
      fetchData();
    } catch (error) {
      console.error('Failed to delete meal:', error);
      toast.error('Failed to delete meal');
      fetchData(); // Revert on failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ meals, summary, isLoading, fetchData, deleteMeal }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
