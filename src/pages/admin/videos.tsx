import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import VideoTable from "../../components/ContentManagement/VideoTable";

interface Video {
  thumbnail: string;
  title: string;
  creator: string;
  type: string;
  status: "active" | "inactive";
  updatedOn: string;
}

export default function FoodieFanVideoPage() {
  // Sample food-related video data
  const [videos, setVideos] = useState<Video[]>([
    {
      thumbnail: "/food1.jpg",
      title: "Easy Homemade Pasta Recipe",
      creator: "Chef Maria",
      type: "Recipe",
      status: "active",
      updatedOn: "2025-03-20"
    },
    {
      thumbnail: "/food2.jpg",
      title: "Birthday Cake Decoration Tips",
      creator: "BakingPro",
      type: "Tutorial",
      status: "active",
      updatedOn: "2025-03-18"
    },
    {
      thumbnail: "/food3.jpg",
      title: "NYC's Best Hidden Restaurants",
      creator: "FoodExplorer",
      type: "Review",
      status: "active",
      updatedOn: "2025-03-15"
    },
    {
      thumbnail: "/food4.jpg",
      title: "How to Make Perfect Sushi at Home",
      creator: "Chef Tanaka",
      type: "Recipe",
      status: "inactive",
      updatedOn: "2025-03-10"
    },
    {
      thumbnail: "/food2.jpg",
      title: "Summer Cocktail Recipes",
      creator: "MixologyMaster",
      type: "Recipe",
      status: "active",
      updatedOn: "2025-03-05"
    },
    {
      thumbnail: "/food1.jpg",
      title: "Exploring Local Farmers Market",
      creator: "FoodExplorer",
      type: "Vlog",
      status: "active",
      updatedOn: "2025-02-28"
    },
    {
      thumbnail: "/food3.jpg",
      title: "Ultimate BBQ Techniques",
      creator: "GrillMaster",
      type: "Tutorial",
      status: "inactive",
      updatedOn: "2025-02-25"
    }
  ]);

  const handleEdit = (video: Video) => {
    // In a real application, this would open a modal or navigate to an edit page
    alert(`Edit video: ${video.title}`);
  };

  const handleDelete = (video: Video) => {
    if (confirm(`Are you sure you want to delete the video: ${video.title}?`)) {
      setVideos(videos.filter(v => v.title !== video.title));
    }
  };

  const handleAddVideo = () => {
    // In a real application, this would open a modal or navigate to a create page
    alert("Upload new recipe video functionality would go here");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#028b6e]">FoodieFan Video Library</h2>
          <button
            onClick={handleAddVideo}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow transition-colors"
          >
            + Upload New Recipe
          </button>
        </div>
        
        <VideoTable 
          videos={videos} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </AdminLayout>
  );
}