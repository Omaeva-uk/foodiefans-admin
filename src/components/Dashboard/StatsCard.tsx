import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  trend?: number; // Add trend percentage
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'text-[#028b6e]',
  trend
}) => {
  return (
    <div className="bg-white border border-[#028b6e]/20 shadow-sm rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} bg-[#F0F9F6]`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <div className="flex items-baseline">
          <p className="text-xl font-bold">{value}</p>
          {trend && (
            <span className={`ml-2 text-xs font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;