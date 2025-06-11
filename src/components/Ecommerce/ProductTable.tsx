import React, { useState, useEffect, useRef } from "react";

interface Product {
  image: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "active" | "inactive";
  updatedOn: string;
  seller?: string; // Optional seller field
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products = [], onEdit, onDelete }) => {
  // Filter states
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sellerFilter, setSellerFilter] = useState<string>("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  // Keep track of images that have already errored to prevent infinite loops
  const erroredImages = useRef<Set<string>>(new Set());
  
  // Update filtered products when source products change
  useEffect(() => {
    setFilteredProducts(products);
    // Reset the errored images set when products change
    erroredImages.current = new Set();
  }, [products]);
  
  // Extract unique values for filters
  const categories = Array.from(new Set(products.map(product => product.category)));
  const sellers = Array.from(new Set(products.map(product => product.seller).filter(Boolean)));
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    if (nameFilter) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    if (statusFilter !== "all") {
      result = result.filter(product => product.status === statusFilter);
    }
    
    if (sellerFilter !== "all" && sellerFilter) {
      result = result.filter(product => product.seller === sellerFilter);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [nameFilter, categoryFilter, statusFilter, sellerFilter, products]);
  
  // Check if any filter is active
  const isFilterActive = 
    nameFilter !== "" || 
    categoryFilter !== "all" || 
    statusFilter !== "all" ||
    (sellerFilter !== "all" && sellerFilter);
  
  // Clear all filters
  const clearFilters = () => {
    setNameFilter("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setSellerFilter("all");
  };
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle image error
  const handleImageError = (name: string, imageUrl: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    // Check if this image has already errored
    if (erroredImages.current.has(`${name}-${imageUrl}`)) {
      return; // Don't try to set src again if it's already failed
    }
    
    // Mark this image as errored
    erroredImages.current.add(`${name}-${imageUrl}`);
    
    // Set fallback image
    const target = e.target as HTMLImageElement;
    target.src = "/product-placeholder.jpg";
  };
  
  return (
    <div className="border border-[#028b6e] rounded-xl overflow-hidden shadow-sm">
      {/* Filters - Single Row with Icons */}
      <div className="bg-gray-50 py-3 px-4 border-b border-[#028b6e]/20">
        <div className="flex flex-wrap items-center gap-3">
          {/* Product name filter */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Search products..."
              className={`py-1.5 px-2 border rounded-lg text-sm ${
                nameFilter 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
            />
          </div>
          
          {/* Category filter */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`py-1.5 px-2 border rounded-lg text-sm ${
                categoryFilter !== "all" 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Seller filter (if available) */}
          {sellers.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
              <select 
                value={sellerFilter}
                onChange={(e) => setSellerFilter(e.target.value)}
                className={`py-1.5 px-2 border rounded-lg text-sm ${
                  sellerFilter !== "all" 
                    ? "border-[#028b6e] bg-green-50" 
                    : "border-gray-300"
                }`}
              >
                <option value="all">All Sellers</option>
                {sellers.map(seller => (
                  <option key={seller} value={seller}>{seller}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Status filter */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`py-1.5 px-2 border rounded-lg text-sm ${
                statusFilter !== "all" 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {/* Products per page selector */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <select 
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(Number(e.target.value))}
              className="py-1.5 px-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value={5}>5/pg</option>
              <option value={10}>10/pg</option>
              <option value={20}>20/pg</option>
            </select>
          </div>
          
          {/* Clear filters button */}
          <button 
            onClick={clearFilters}
            disabled={!isFilterActive}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              isFilterActive 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear
          </button>
        </div>
      </div>
      
      {/* Results summary and pagination */}
      <div className="p-4 text-sm text-gray-600 flex justify-between items-center border-b border-gray-100">
        <span>
          {isFilterActive ? (
            <span className="text-[#028b6e] font-medium">Filtered:</span>
          ) : (
            <span>Total:</span>
          )} {filteredProducts.length} products
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Original Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Updated On</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded object-cover"
                      onError={(e) => handleImageError(product.name, product.image, e)}
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {product.name}
                    {product.seller && (
                      <div className="text-xs text-gray-500 mt-1">Seller: {product.seller}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.category}</td>
                  <td className="py-3 px-4 text-gray-600">{product.price}</td>
                  <td className="py-3 px-4">
                    {product.stock > 0 ? product.stock : (
                      <span className="text-red-500">Out of stock</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.updatedOn}</td>
                  <td className="py-3 px-4 text-center flex gap-2 justify-center">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(product)} 
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Bottom pagination (only shows on larger data sets) */}
      {totalPages > 3 && (
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              const pageNum = currentPage <= 3 
                ? idx + 1 
                : currentPage + idx - 2 > totalPages 
                  ? totalPages - 4 + idx 
                  : currentPage + idx - 2;
              
              if (pageNum <= 0 || pageNum > totalPages) return null;
              
              return (
                <button 
                  key={idx}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-sm ${
                    currentPage === pageNum 
                      ? 'bg-[#028b6e] text-white' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;