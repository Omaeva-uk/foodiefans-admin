import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import GalleryTable from "../../components/ContentManagement/GalleryTable";

interface Gallery {
  creatorName: string;
  creatorAvatar: string;
  galleryTitle: string;
  photosCount: number;
  status: "active" | "inactive";
  createdOn: string;
  updatedOn: string;
}

export default function GalleryManagementPage() {
  // Sample data
  const [galleries, setGalleries] = useState<Gallery[]>([
    {
      creatorName: "John Doe",
      creatorAvatar: "/avatar1.jpg",
      galleryTitle: "Summer Vacation 2025",
      photosCount: 24,
      status: "active",
      createdOn: "2025-03-15",
      updatedOn: "2025-03-18"
    },
    {
      creatorName: "Jane Smith",
      creatorAvatar: "/avatar2.jpg",
      galleryTitle: "Product Photoshoot - Spring Collection",
      photosCount: 45,
      status: "active",
      createdOn: "2025-03-10",
      updatedOn: "2025-03-12"
    },
    {
      creatorName: "Alex Johnson",
      creatorAvatar: "/avatar3.jpg",
      galleryTitle: "Nature Landscapes",
      photosCount: 32,
      status: "inactive",
      createdOn: "2025-02-28",
      updatedOn: "2025-03-05"
    },
    {
      creatorName: "Sarah Williams",
      creatorAvatar: "/avatar4.jpg",
      galleryTitle: "City Architecture",
      photosCount: 18,
      status: "active",
      createdOn: "2025-03-01",
      updatedOn: "2025-03-02"
    },
    {
      creatorName: "John Doe",
      creatorAvatar: "/avatar1.jpg",
      galleryTitle: "Wildlife Photography",
      photosCount: 37,
      status: "active",
      createdOn: "2025-02-20",
      updatedOn: "2025-03-01"
    },
    {
      creatorName: "Maria Garcia",
      creatorAvatar: "/avatar5.jpg",
      galleryTitle: "Fashion Week 2025",
      photosCount: 56,
      status: "active",
      createdOn: "2025-03-05",
      updatedOn: "2025-03-06"
    },
    {
      creatorName: "David Lee",
      creatorAvatar: "/avatar6.jpg",
      galleryTitle: "Food Photography",
      photosCount: 29,
      status: "inactive",
      createdOn: "2025-02-15",
      updatedOn: "2025-02-28"
    }
  ]);

  const handleEdit = (gallery: Gallery) => {
    // In a real application, this would open a modal or navigate to an edit page
    alert(`Edit gallery: ${gallery.galleryTitle}`);
  };

  const handleDelete = (gallery: Gallery) => {
    if (confirm(`Are you sure you want to delete the gallery: ${gallery.galleryTitle}?`)) {
      setGalleries(galleries.filter(g => g.galleryTitle !== gallery.galleryTitle));
    }
  };

  const handleAddGallery = () => {
    // In a real application, this would open a modal or navigate to a create page
    alert("Add new gallery functionality would go here");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#028b6e]">Gallery Management</h2>
          <button
            onClick={handleAddGallery}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow transition-colors"
          >
            + Create New Gallery
          </button>
        </div>
        
        <GalleryTable 
          galleries={galleries} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </AdminLayout>
  );
}