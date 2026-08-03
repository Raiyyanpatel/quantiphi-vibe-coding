import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useDashboard } from '../context/DashboardContext';
import { toast } from 'react-hot-toast';
import { Camera, Loader2, Plus, Scale, Utensils } from 'lucide-react';

type FormData = {
  name: string;
  weight: number;
};

const FoodLogForm: React.FC = () => {
  const { fetchData } = useDashboard();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/meals', {
        name: data.name,
        weight: Number(data.weight)
      });
      toast.success('Meal logged successfully!');
      reset();
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to log meal');
    }
  };

  const handleImageUpload = async () => {
    setIsAnalyzing(true);
    const loadingToast = toast.loading('Analyzing image...');
    try {
      // Mocking an image upload by just calling the analyze endpoint
      const response = await api.post('/meals/analyze-image');
      const { name, weight } = response.data.data;
      
      setValue('name', name);
      setValue('weight', weight);
      toast.success('Image analyzed successfully! Form autofilled.', { id: loadingToast });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to analyze image', { id: loadingToast });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Log a Meal</h2>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={isAnalyzing}
          className="text-sm flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 py-1.5 px-3 rounded-lg disabled:opacity-50 transition-all font-medium"
        >
          {isAnalyzing ? (
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <Camera className="w-4 h-4 mr-1.5" />
          )}
          {isAnalyzing ? 'Analyzing...' : 'Upload Image'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-grow flex flex-col justify-center">
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
            <Utensils className="w-4 h-4 mr-1.5 text-gray-400" />
            Food Name
          </label>
          <input
            {...register('name', { required: 'Food name is required' })}
            placeholder="e.g. Chicken Breast, Apple"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
            <Scale className="w-4 h-4 mr-1.5 text-gray-400" />
            Weight (grams)
          </label>
          <input
            type="number"
            {...register('weight', { 
              required: 'Weight is required',
              min: { value: 1, message: 'Weight must be greater than 0' }
            })}
            placeholder="100"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1.5">{errors.weight.message}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 ease-in-out disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center shadow-sm hover:shadow"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5 mr-1.5" />
                Log Meal
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodLogForm;
