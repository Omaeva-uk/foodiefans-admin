import { useState, ReactNode } from "react";
import AdminHeader from "../Header/AdminHeader";
import AdminSidebar from "../Sidebar/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-4">
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 mt-4 gap-4">
        {sidebarOpen && <AdminSidebar />}
        <main className="flex-1 bg-white shadow rounded-2xl p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
