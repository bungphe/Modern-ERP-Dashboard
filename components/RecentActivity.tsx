import React from 'react';
import { ActivityLog } from '../types';

interface RecentActivityProps {
  activities: ActivityLog[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Hoạt động gần đây</h3>
        <button className="text-blue-600 text-sm hover:underline">Xem tất cả</button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="relative border-l border-gray-200 ml-3 space-y-6 py-2">
          {activities.map((activity) => (
            <div key={activity.id} className="mb-6 ml-4 relative">
              {/* Timeline dot */}
              <span className={`absolute -left-[25px] top-1 h-4 w-4 rounded-full border-2 border-white ${activity.avatarColor}`}></span>
              
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-700">{activity.user} <span className="text-gray-600 font-normal">{activity.action}</span></span>
                <span className="text-xs text-gray-400 mt-0.5">{activity.date} {activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;