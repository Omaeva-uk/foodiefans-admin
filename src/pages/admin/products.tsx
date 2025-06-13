import { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import ProductTable from "../../components/Ecommerce/ProductTable";

interface Product {
  image: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "active" | "inactive";
  updatedOn: string;
  seller?: string;
}

export default function ProductManagementPage() {
  // Sample food-related product data
  const [products, setProducts] = useState<Product[]>([
    {
      image: "/book1.jpg",
      name: "The Complete Italian Cookbook",
      category: "Recipe Books",
      price: "$24.99",
      stock: 15,
      status: "active",
      updatedOn: "2025-03-20",
      seller: "Chef Maria"
    },
    {
      image: "/pan.jpg",
      name: "Professional Cast Iron Skillet",
      category: "Cookware",
      price: "$49.99",
      stock: 8,
      status: "active",
      updatedOn: "2025-03-18",
      seller: "KitchenPro"
    },
    {
      image: "/book1.jpg",
      name: "Asian Street Food Recipes",
      category: "Recipe Books",
      price: "$22.95",
      stock: 12,
      status: "active",
      updatedOn: "2025-03-15",
      seller: "Chef Wong"
    },
    {
      image: "/knife.jpg",
      name: "Premium Chef Knife Set",
      category: "Utensils",
      price: "$89.99",
      stock: 0,
      status: "inactive",
      updatedOn: "2025-03-10",
      seller: "KitchenPro"
    },
    {
      image: "/book1.jpg",
      name: "The Art of French Baking",
      category: "Recipe Books",
      price: "$29.99",
      stock: 7,
      status: "active",
      updatedOn: "2025-03-05",
      seller: "Pastry Expert"
    },
    {
      image: "/products/apron.jpg",
      name: "Professional Chef Apron",
      category: "Apparel",
      price: "$19.99",
      stock: 25,
      status: "active",
      updatedOn: "2025-02-28",
      seller: "KitchenPro"
    },
    {
      image: "/book1.jpg",
      name: "Ultimate BBQ and Grilling Guide",
      category: "Recipe Books",
      price: "$24.99",
      stock: 0,
      status: "inactive",
      updatedOn: "2025-02-25",
      seller: "Grill Master"
    }
  ]);

  const handleEdit = (product: Product) => {
    // In a real application, this would open a modal or navigate to an edit page
    alert(`Edit product: ${product.name}`);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete the product: ${product.name}?`)) {
      setProducts(products.filter(p => p.name !== product.name));
    }
  };

  const handleAddProduct = () => {
    // In a real application, this would open a modal or navigate to a create page
    alert("Add new product functionality would go here");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow rounded-2xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#028b6e]">FoodieFan Marketplace</h2>
          <button
            onClick={handleAddProduct}
            className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow transition-colors"
          >
            + Add New Product
          </button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Total Products</div>
            <div className="text-2xl font-semibold">{products.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Active Products</div>
            <div className="text-2xl font-semibold text-green-600">
              {products.filter(p => p.status === "active").length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Out of Stock</div>
            <div className="text-2xl font-semibold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="text-sm text-gray-500">Recipe Books</div>
            <div className="text-2xl font-semibold text-[#028b6e]">
              {products.filter(p => p.category === "Recipe Books").length}
            </div>
          </div>
        </div>
        
        <ProductTable 
          products={products} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>
    </AdminLayout>
  );
}