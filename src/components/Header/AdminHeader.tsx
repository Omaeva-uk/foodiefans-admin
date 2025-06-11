import { Menu, Bell, UserCircle, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    title: "New user registration",
    message: "Jane Smith has registered as a new creator",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "New order placed",
    message: "Order #4582 has been placed for £75.99",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "System update",
    message: "The platform will undergo maintenance tonight at 02:00 GMT",
    time: "3 hours ago",
    read: false
  }
];

export default function AdminHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const router = useRouter();
  // State for modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  
  // Admin user info
  const adminUser = {
    name: "John Administrator",
    email: "admin@foodiefan.com",
    role: "Super Admin",
    avatar: "/admin-avatar.png" // You can replace this with actual path
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  // Close notifications when clicking outside
  const handleClickOutside = () => {
    setShowNotifications(false);
    setShowProfileMenu(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Here you would typically clear any auth tokens or cookies
    // For example: localStorage.removeItem('adminAuthToken');
    
    // Redirect to login page
    router.push('/admin/login');
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-b-2xl">
      {/* Left side — Logo and Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-[#F0F9F6] rounded-xl shadow hover:bg-[#E5F5F0] transition"
        >
          <Menu size={20} className="text-[#4EB596]" />
        </button>
        <img src="/logo2.png" alt="FoodieFans Admin" className="h-8" />
      </div>

      {/* Right side — Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 bg-[#F0F9F6] rounded-xl shadow hover:bg-[#E5F5F0] transition"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
          >
            <Bell size={20} className="text-[#4EB596]" />
            {notifications.some(n => !n.read) && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={handleClickOutside}
              ></div>
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-20 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-[#4EB596] hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition ${!notification.read ? 'bg-[#F0F9F6]' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-[#4EB596]"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No notifications
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-gray-100 text-center">
                  <a href="#" className="text-xs text-[#4EB596] hover:underline">
                    View all notifications
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Profile Menu */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer p-2 bg-[#F0F9F6] rounded-xl shadow hover:bg-[#E5F5F0] transition"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <UserCircle size={24} className="text-[#4EB596]" />
            <span className="hidden md:block text-gray-700 font-semibold">Admin</span>
          </div>
          
          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={handleClickOutside}
              ></div>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-20 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  {adminUser.avatar ? (
                    <img src={adminUser.avatar} alt="Profile" className="w-10 h-10 rounded-full bg-gray-200" />
                  ) : (
                    <UserCircle size={40} className="text-[#4EB596]" />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-700">{adminUser.name}</h3>
                    <p className="text-xs text-gray-500">{adminUser.email}</p>
                    <span className="text-xs px-2 py-0.5 bg-[#F0F9F6] text-[#4EB596] rounded-full mt-1 inline-block">
                      {adminUser.role}
                    </span>
                  </div>
                </div>
                
                <div className="py-2">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <User size={16} />
                    <span>My Profile</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-gray-50 transition"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}