import React from 'react';

const recentActivities = [
  { name: 'John Doe', action: 'Signed up as Fan', date: '22 Mar 2025' },
  { name: 'Jane Smith', action: 'Uploaded a recipe', date: '21 Mar 2025' },
  { name: 'Chef Alex', action: 'Joined as Creator', date: '20 Mar 2025' },
  { name: 'Emily Stone', action: 'Made a purchase', date: '19 Mar 2025' },
  { name: 'Michael Wong', action: 'Subscribed to premium', date: '18 Mar 2025' },
];

const RecentActivityTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#028b6e]/50 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-bold text-gray-800">Recent Activity</h4>
        <div className="text-xs font-medium text-gray-500">
          Last 7 days
        </div>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100">
              <th className="py-2 px-1 text-left font-medium">User</th>
              <th className="py-2 px-1 text-left font-medium">Action</th>
              <th className="py-2 px-1 text-left font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                  index === 0 ? 'bg-green-50/30' : ''
                }`}
              >
                <td className="py-2 px-1">
                  <div className="font-medium">{activity.name}</div>
                </td>
                <td className="py-2 px-1 text-gray-600">{activity.action}</td>
                <td className="py-2 px-1 text-gray-500 text-xs">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end mt-3 pt-2">
        <button className="text-xs text-[#028b6e] font-medium hover:underline">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTable;