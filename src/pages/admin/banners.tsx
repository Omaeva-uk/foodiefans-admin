import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import BannerTable from "../../components/ContentManagement/BannerTable";

interface Banner {
  id: number;
  image: string;
  title: string;
  placement: string;
  status: "Active" | "Inactive";
  startDate: string;
  endDate: string;
  updatedOn: string;
}

export default function BannersPage() {
  // Sample data
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      image: "/offer.png",
      title: "Summer Collection",
      placement: "Homepage",
      status: "Active",
      startDate: "2025-03-01",
      endDate: "2025-06-30",
      updatedOn: "2025-02-28"
    },
    {
      id: 2,
      image: "/offer.png",
      title: "Spring Sale",
      placement: "Category Page",
      status: "Active",
      startDate: "2025-03-15",
      endDate: "2025-04-15",
      updatedOn: "2025-03-10"
    },
    {
      id: 3,
      image: "/offer.png",
      title: "New Arrivals",
      placement: "Sidebar",
      status: "Inactive",
      startDate: "2025-05-01",
      endDate: "2025-05-31",
      updatedOn: "2025-03-01"
    },
    {
      id: 4,
      image: "/offer.png",
      title: "Newsletter Signup",
      placement: "Popup",
      status: "Active",
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      updatedOn: "2025-02-25"
    },
    {
      id: 5,
      image:"/offer.png",
      title: "Free Shipping",
      placement: "Footer",
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      updatedOn: "2025-01-01"
    },
    {
      id: 6,
      image: "/offer.png",
      title: "Limited Edition",
      placement: "Product Page",
      status: "Inactive",
      startDate: "2025-06-01",
      endDate: "2025-07-31",
      updatedOn: "2025-03-15"
    },
    {
      id: 7,
      image: "/offer.png",
      title: "Flash Sale",
      placement: "Header",
      status: "Active",
      startDate: "2025-03-20",
      endDate: "2025-03-25",
      updatedOn: "2025-03-18"
    }
  ]);

  const handleEdit = (banner: Banner) => {
    // In a real application, this would open a modal or navigate to an edit page
    alert(`Edit banner: ${banner.title}`);
  };

  const handleDelete = (banner: Banner) => {
    if (confirm(`Are you sure you want to delete the banner: ${banner.title}?`)) {
      setBanners(banners.filter(b => b.id !== banner.id));
    }
  };

  const handleAddBanner = () => {
    // In a real application, this would open a modal or navigate to a create page
    alert("Add new banner functionality would go here");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#028b6e]">Banner Management</h2>
          <button
            onClick={handleAddBanner}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow transition-colors"
          >
            + Add New Banner
          </button>
        </div>
        
        <BannerTable 
          banners={banners} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </AdminLayout>
  );
}