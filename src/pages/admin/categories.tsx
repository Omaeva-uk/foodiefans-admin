import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import CategoryTable from "../../components/ContentManagement/CategoryTable";
import CreateCategoryModal from "../../components/ContentManagement/CreateCategoryModal";

interface Category {
  name: string;
  slug: string;
  status: string;
  createdOn: string;
}

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    { name: "Breakfast", slug: "breakfast", status: "active", createdOn: "20/03/2025" },
    { name: "Dinner", slug: "dinner", status: "active", createdOn: "15/03/2025" },
  ]);

  const handleEdit = (category: Category) => {
    alert(`Edit category: ${category.name}`);
  };

  const handleDelete = (category: Category) => {
    const updated = categories.filter((c) => c.slug !== category.slug);
    setCategories(updated);
  };

  const handleCreateCategory = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    setIsModalOpen(false); // Close the modal after creating
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#028b6e]">Manage Categories</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow transition-colors"
          >
            + Create New Category
          </button>
        </div>
        <CategoryTable 
          categories={categories} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
        {isModalOpen && (
          <CreateCategoryModal 
            closeModal={() => setIsModalOpen(false)} 
            onCreate={handleCreateCategory} 
          />
        )}
      </div>
    </AdminLayout>
  );
}