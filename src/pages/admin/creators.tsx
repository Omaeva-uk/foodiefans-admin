import { useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import CreateCreatorModal from "../../components/UserManagement/CreateCreatorModal";
import CreatorTable from "../../components/UserManagement/CreatorTable";

// Define the Creator type
interface Creator {
  avatar: string;
  displayName: string;
  username: string;
  email: string;
  featured: boolean;
  status: "active" | "inactive";
  verifiedEmail: boolean;
  verifiedId: boolean;
  verifiedAccount: boolean;
  updatedOn: string;
}

// Define the type for form data received from CreateCreatorModal
interface CreatorFormData {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  email: string;
  walletBalance: string;
  gender: string;
  password: string;
  confirmPassword: string;
  bio: string;
  featured: boolean;
  status: string;
  verifiedEmail: boolean;
  verifiedId: boolean;
  verifiedAccount: boolean;
  avatar: File | null;
}

const dummyCreators: Creator[] = [
  {
    avatar: "/avatar1.png",
    displayName: "Chef Dhamu",
    username: "dhamu",
    email: "dhamu@gmail.com",
    featured: true,
    status: "active",
    verifiedEmail: true,
    verifiedId: true,
    verifiedAccount: true,
    updatedOn: "12/02/2025 09:30",
  },
  {
    avatar: "/avatar2.png",
    displayName: "King of Cocktails",
    username: "daldegroff",
    email: "dale@foodiefans.io",
    featured: true,
    status: "active",
    verifiedEmail: true,
    verifiedId: true,
    verifiedAccount: true,
    updatedOn: "16/10/2024 14:17",
  },
  // Add more dummy creators...
];

export default function CreatorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creators, setCreators] = useState<Creator[]>(dummyCreators);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEdit = (creator: Creator) => {
    alert(`Edit creator: ${creator.displayName}`);
  };

  const handleDelete = (creator: Creator) => {
    alert(`Delete creator: ${creator.displayName}`);
    // In a real app, you would remove the creator from your data source
    setCreators(creators.filter(c => c.username !== creator.username));
  };

  const handleCreateCreator = (formData: CreatorFormData) => {
    // Create a new creator object with all fields
    const newCreator: Creator = {
      avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : "/placeholder-avatar.jpg",
      displayName: formData.displayName || `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      status: formData.status as "active" | "inactive",
      featured: formData.featured || false,
      verifiedEmail: formData.verifiedEmail || false,
      verifiedId: formData.verifiedId || false,
      verifiedAccount: formData.verifiedAccount || false,
      updatedOn: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', ''),
    };

    // Add the new creator to the list
    setCreators([...creators, newCreator]);
    
    // Optional: Show success message
    alert(`Creator "${newCreator.displayName}" has been created successfully!`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 p-4">
      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 mt-4 gap-4">
        {sidebarOpen && <AdminSidebar />}

        <main className="flex-1 bg-white shadow rounded-2xl p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#028b6e]">Manage Creators</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow"
            >
              + Create New Creator
            </button>
          </div>
          
          <CreatorTable creators={creators} onEdit={handleEdit} onDelete={handleDelete} />
          
          <CreateCreatorModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onCreate={handleCreateCreator}
          />
        </main>
      </div>
    </div>
  );
}