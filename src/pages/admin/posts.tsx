import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import PostTable from "../../components/ContentManagement/PostTable";

interface Post {
  creator: string;
  creatorAvatar: string;
  description: string;
  type: string;
  ppv: boolean;
  status: "active" | "inactive";
  updatedOn: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      creator: "John Doe",
      creatorAvatar: "/avatar1.jpg",
      description: "This is a sample post about new features coming to the platform",
      type: "Announcement",
      ppv: false,
      status: "active",
      updatedOn: "2025-03-20"
    },
    {
      creator: "Jane Smith",
      creatorAvatar: "/avatar2.jpg",
      description: "Premium content for subscribers only - Learn advanced techniques",
      type: "Tutorial",
      ppv: true,
      status: "active",
      updatedOn: "2025-03-21"
    },
    {
      creator: "Alex Johnson",
      creatorAvatar: "/avatar3.jpg",
      description: "Important update on community guidelines and best practices",
      type: "Notice",
      ppv: false,
      status: "active",
      updatedOn: "2025-03-22"
    },
    {
      creator: "Sarah Williams",
      creatorAvatar: "/avatar4.jpg",
      description: "Special event coming next month - mark your calendars!",
      type: "Event",
      ppv: true,
      status: "inactive",
      updatedOn: "2025-03-18"
    }
  ]);

  const handleEdit = (post: Post) => {
    alert(`Edit post by: ${post.creator}`);
  };

  const handleDelete = (post: Post) => {
    alert(`Delete post by: ${post.creator}`);
    setPosts(posts.filter(p => p !== post));
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#028b6e]">Newsfeed Posts</h2>
          {/* <button
            onClick={() => alert('Create new post functionality would go here')}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow"
          >
            + Create New Post
          </button> */}
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {/* Filters could be added here */}
          </div>
        </div>
        
        <PostTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  );
}