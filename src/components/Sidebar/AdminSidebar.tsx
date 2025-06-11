import { useState } from 'react';
import Link from 'next/link';
import { Home, Users, User, Image, Video, ShoppingBag, BarChart, Settings, CreditCard, FolderOpen, BadgePercent, Layers, Wallet,  ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router'; 

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  return (
    <div className={`bg-gradient-to-b from-[#028b6e] to-[#026655] text-white h-screen shadow-2xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} rounded-tr-3xl rounded-br-3xl flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-white/10 mb-4">
        {isOpen && <div className="font-bold text-xl">FoodieFans</div>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`p-2 rounded-full hover:bg-white/20 transition-colors ${!isOpen && 'mx-auto'}`}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <ul className="space-y-1 px-2">
          <li>
            <Link href="/admin/dashboard" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin-dashboard' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Home size={20} />
              </div>
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          
          {isOpen && <div className="text-xs uppercase text-white/50 px-3 py-2 mt-4">User Management</div>}
          
          <li>
            <Link href="/admin/fans" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/fans' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Users size={20} />
              </div>
              {isOpen && <span>Manage Fans</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/creators" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/creators' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <User size={20} />
              </div>
              {isOpen && <span>Manage Creators</span>}
            </Link>
          </li>
          
          {isOpen && <div className="text-xs uppercase text-white/50 px-3 py-2 mt-4">Content</div>}
          
          <li>
            <Link href="/admin/categories" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/categories' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Layers size={20} />
              </div>
              {isOpen && <span>Categories</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/posts" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/posts' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <FolderOpen size={20} />
              </div>
              {isOpen && <span>Posts</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/banners" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/banners' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Image size={20} />
              </div>
              {isOpen && <span>Banners</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/galleries" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/galleries' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Image size={20} />
              </div>
              {isOpen && <span>Galleries</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/videos" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/videos' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Video size={20} />
              </div>
              {isOpen && <span>Videos</span>}
            </Link>
          </li>
          
          {isOpen && <div className="text-xs uppercase text-white/50 px-3 py-2 mt-4">E-Commerce</div>}
          
          <li>
            <Link href="/admin/products" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/products' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <ShoppingBag size={20} />
              </div>
              {isOpen && <span>Products</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/coupons" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/coupons' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <BadgePercent size={20} />
              </div>
              {isOpen && <span>Coupons</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/order-history" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/order-history' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <CreditCard size={20} />
              </div>
              {isOpen && <span>Order History</span>}
            </Link>
          </li>
          
          {isOpen && <div className="text-xs uppercase text-white/50 px-3 py-2 mt-4">Analytics</div>}
          
          <li>
            <Link href="/admin/reports" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/reports' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <BarChart size={20} />
              </div>
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
          <li>
            <Link href="/admin/wallet" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/wallet-transactions' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Wallet size={20} />
              </div>
              {isOpen && <span>Wallet Transactions</span>}
            </Link>
          </li>
          
          {isOpen && <div className="text-xs uppercase text-white/50 px-3 py-2 mt-4">System</div>}
          
          <li>
            <Link href="/admin/settings" className={`flex items-center gap-3 hover:bg-white/20 rounded-xl p-3 ${router.pathname === '/admin/settings' ? 'bg-white/20' : ''}`}>
              <div className="min-w-[24px] flex justify-center">
                <Settings size={20} />
              </div>
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Profile section at bottom */}
      {isOpen && (
        <div className="mt-auto p-4 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">Admin User</div>
            <div className="text-xs text-white/70 truncate">admin@foodiefans.com</div>
          </div>
        </div>
      )}
    </div>
  );
}