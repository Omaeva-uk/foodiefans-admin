import { useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import RecentActivityTable from '../../components/Dashboard/RecentActivityTable';
import RevenueChart from '../../components/Dashboard/RevenueChart';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-4">
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 mt-4 gap-4">
        {sidebarOpen && <AdminSidebar />}

        <main className={`flex-1 bg-white shadow rounded-2xl p-6 overflow-auto ${sidebarOpen ? 'transition-all duration-300' : 'transition-all duration-300'}`}>
          <h2 className="text-xl font-bold mb-4 text-[#028b6e]">Admin Dashboard</h2>
          
          {/* Stats Grid */}
          <StatsGrid />
          
          {/* Revenue Chart and Recent Activity in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="h-full">
              <RevenueChart />
            </div>
            <div className="h-full">
              <RecentActivityTable />
            </div>
          </div>
          
          {/* Add more dashboard sections here */}
          <div className="mt-6">
            {/* Additional dashboard widgets or content */}
          </div>
        </main>
      </div>
    </div>
  );
}