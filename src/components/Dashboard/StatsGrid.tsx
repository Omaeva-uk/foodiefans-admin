import React from 'react';
import StatsCard from './StatsCard';
import { User, Users, FolderOpen, ShoppingBag, Video, Image, Wallet, HeartHandshake } from 'lucide-react';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <StatsCard 
        title="Active Users" 
        value="2,439" 
        icon={<Users size={20} />} 
        trend={12}
      />
      <StatsCard 
        title="Active Creators" 
        value="156" 
        icon={<HeartHandshake size={20} />} 
        trend={8.5}
      />
      <StatsCard 
        title="Total Posts" 
        value="1,247" 
        icon={<FolderOpen size={20} />} 
        trend={24.3}
      />
      <StatsCard 
        title="Total Products" 
        value="384" 
        icon={<ShoppingBag size={20} />} 
        trend={-3.2}
      />
      <StatsCard 
        title="Total Videos" 
        value="672" 
        icon={<Video size={20} />} 
        trend={15.7}
      />
      <StatsCard 
        title="Total Galleries" 
        value="908" 
        icon={<Image size={20} />} 
        trend={10.4}
      />
      <StatsCard 
        title="Total Subscribers" 
        value="1,293" 
        icon={<User size={20} />} 
        trend={18.9}
      />
      <StatsCard 
        title="Platform Earnings" 
        value="£12,841.28" 
        icon={<Wallet size={20} />} 
        trend={21.6}
      />
    </div>
  );
};

export default StatsGrid;