import React from "react";

interface Category {
  name: string;
  slug: string;
  status: "active" | "inactive";
  createdOn: string;
}

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left">Category Name</th>
            <th className="py-3 px-4 text-left">Slug</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Created On</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
              <td className="py-3 px-4 font-medium">{cat.name}</td>
              <td className="py-3 px-4 text-gray-600">{cat.slug}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {cat.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{cat.createdOn}</td>
              <td className="py-3 px-4 text-center flex gap-2 justify-center">
                <button onClick={() => onEdit(cat)} className="text-blue-500 hover:underline text-sm">Edit</button>
                <button onClick={() => onDelete(cat)} className="text-red-500 hover:underline text-sm">Delete</button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
