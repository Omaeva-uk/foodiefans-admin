import { useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import FanTable from "../../components/UserManagement/FanTable";
import CreateFanModal from "../../components/UserManagement/CreateFanModal";

// Define the Fan type
interface Fan {
  avatar: string;
  displayName: string;
  username: string;
  email: string;
  status: "active" | "inactive";
  verified: boolean;
  updatedOn: string;
  walletBalance?: string;
  gender?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

// Define the type for form data received from CreateFanModal
interface FanFormData {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  email: string;
  walletBalance: string;
  gender: string;
  password: string;
  confirmPassword: string;
  role: string;
  status: string;
  verified: boolean;
  avatar: File | null;
}

const dummyFans: Fan[] = [
  {
    avatar: "/avatar1.jpg",
    displayName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    status: "active",
    verified: true,
    updatedOn: "22 Mar 2025",
  },
  {
    avatar: "/avatar2.jpg",
    displayName: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    status: "inactive",
    verified: false,
    updatedOn: "20 Mar 2025",
  },
];

export default function FansPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fans, setFans] = useState<Fan[]>(dummyFans);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEdit = (fan: Fan) => {
    alert(`Edit fan: ${fan.displayName}`);
  };

  const handleDelete = (fan: Fan) => {
    alert(`Delete fan: ${fan.displayName}`);
    // In a real app, you would remove the fan from your data source
    setFans(fans.filter(f => f.username !== fan.username));
  };

  const handleCreateFan = (formData: FanFormData) => {
    // Create a new fan object with all fields
    const newFan: Fan = {
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : "/placeholder-avatar.jpg",
      displayName: formData.displayName || `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      status: formData.status as "active" | "inactive",
      verified: formData.verified,
      walletBalance: formData.walletBalance || "0.00",
      gender: formData.gender,
      role: formData.role,
      firstName: formData.firstName,
      lastName: formData.lastName,
      updatedOn: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
    };

    // Add the new fan to the list
    setFans([...fans, newFan]);
    
    // Optional: Show success message
    alert(`Fan "${newFan.displayName}" has been created successfully!`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-4">
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 mt-4 gap-4">
        {sidebarOpen && <AdminSidebar />}

        <main className="flex-1 bg-white shadow rounded-2xl p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#028b6e]">Manage Fans</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow"
            >
              + Create New Fan
            </button>
          </div>
          
          <FanTable fans={fans} onEdit={handleEdit} onDelete={handleDelete} />
          
          <CreateFanModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onCreate={handleCreateFan}
          />
        </main>
      </div>
    </div>
  );
}