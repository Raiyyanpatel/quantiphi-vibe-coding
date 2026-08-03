import React from 'react';

interface MacroCardProps {
  title: string;
  current: number;
  target: number;
  progress: number;
  colorClass: string;
}

const MacroCard: React.FC<MacroCardProps> = ({ title, current, target, progress, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">{title}</h3>
        <span className="text-xs font-medium text-gray-400">{progress}%</span>
      </div>
      
      <div>
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl font-bold text-gray-800">{current}</span>
          <span className="text-sm font-medium text-gray-400">/ {target} g</span>
        </div>
        
        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out rounded-full ${colorClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MacroCard;
