import React from 'react';
import { 
  DollarSign, TrendingUp, FileWarning, RefreshCcw, 
  ShoppingCart, AlertTriangle, Receipt, ArrowLeftRight, 
  Info 
} from 'lucide-react';
import { KpiData } from '../types';

const iconMap = {
  DollarSign,
  TrendingUp,
  FileWarning,
  RefreshCcw,
  ShoppingCart,
  AlertTriangle,
  Receipt,
  ArrowLeftRight,
};

interface StatCardProps {
  data: KpiData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const IconComponent = iconMap[data.iconName];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-start justify-between hover:shadow-md transition-shadow duration-200">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-2 rounded-full ${data.bgClass}`}>
            <IconComponent className={`w-5 h-5 ${data.colorClass}`} />
          </div>
          <div className="text-sm text-gray-500 font-medium flex items-center gap-1">
            {data.label}
            {data.tooltip && (
              <div className="group relative">
                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {data.tooltip}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 text-lg font-bold text-gray-800 pl-1">
          {data.value.toLocaleString()} {data.currency}
        </div>
      </div>
    </div>
  );
};

export default StatCard;