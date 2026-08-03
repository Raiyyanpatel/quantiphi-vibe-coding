import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

type FormData = {
  name: string;
  weight: number;
};

interface FoodLogFormProps {
  onMealAdded: () => void;
}

const FoodLogForm: React.FC<FoodLogFormProps> = ({ onMealAdded }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setSuccessMsg(null);
    try {
      await api.post('/meals', {
        name: data.name,
        weight: Number(data.weight)
      });
      setSuccessMsg('Meal logged successfully!');
      reset();
      onMealAdded();
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Failed to log meal');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Log a Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
          <input
            {...register('name', { required: 'Food name is required' })}
            placeholder="e.g. Chicken Breast, Apple"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
          <input
            type="number"
            {...register('weight', { 
              required: 'Weight is required',
              min: { value: 1, message: 'Weight must be greater than 0' }
            })}
            placeholder="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
        </div>

        {serverError && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">{serverError}</div>}
        {successMsg && <div className="text-green-600 bg-green-50 p-3 rounded-lg text-sm">{successMsg}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-150 ease-in-out disabled:opacity-50"
        >
          {isSubmitting ? 'Logging...' : 'Log Meal'}
        </button>
      </form>
    </div>
  );
};

export default FoodLogForm;
