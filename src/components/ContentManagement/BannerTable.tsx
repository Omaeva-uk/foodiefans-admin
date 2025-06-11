import React, { useState, useEffect, useRef } from "react";

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

interface BannerTableProps {
  banners: Banner[];
  onEdit: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({ banners = [], onEdit, onDelete }) => {
  // Filter states
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>(banners);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [placementFilter, setPlacementFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [bannersPerPage, setBannersPerPage] = useState(5);

  // Keep track of images that have already errored to prevent infinite loops
  const erroredImages = useRef<Set<string>>(new Set());
  
  // Update filtered banners when source banners change
  useEffect(() => {
    setFilteredBanners(banners);
    // Reset the errored images set when banners change
    erroredImages.current = new Set();
  }, [banners]);
  
  // Extract unique values for filters
  const placements = Array.from(new Set(banners.map(banner => banner.placement)));
  
  // Apply filters
  useEffect(() => {
    let result = [...banners];
    
    if (titleFilter) {
      result = result.filter(banner => 
        banner.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }
    
    if (placementFilter !== "all") {
      result = result.filter(banner => banner.placement === placementFilter);
    }
    
    if (statusFilter !== "all") {
      result = result.filter(banner => banner.status === statusFilter);
    }
    
    if (startDateFilter) {
      result = result.filter(banner => 
        new Date(banner.startDate) >= new Date(startDateFilter)
      );
    }
    
    if (endDateFilter) {
      result = result.filter(banner => 
        new Date(banner.endDate) <= new Date(endDateFilter)
      );
    }
    
    setFilteredBanners(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [titleFilter, placementFilter, statusFilter, startDateFilter, endDateFilter, banners]);
  
  // Check if any filter is active
  const isFilterActive = 
    titleFilter !== "" || 
    placementFilter !== "all" || 
    statusFilter !== "all" || 
    startDateFilter !== "" || 
    endDateFilter !== "";
  
  // Clear all filters
  const clearFilters = () => {
    setTitleFilter("");
    setPlacementFilter("all");
    setStatusFilter("all");
    setStartDateFilter("");
    setEndDateFilter("");
  };
  
  // Calculate pagination
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(filteredBanners.length / bannersPerPage);

  // Handle image error
  const handleImageError = (bannerId: number, imageUrl: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    // Check if this image has already errored
    if (erroredImages.current.has(`${bannerId}-${imageUrl}`)) {
      return; // Don't try to set src again if it's already failed
    }
    
    // Mark this image as errored
    erroredImages.current.add(`${bannerId}-${imageUrl}`);
    
    // Set fallback image
    const target = e.target as HTMLImageElement;
    target.src = "/offer.jpg";
  };
  
  return (
    <div className="border border-[#028b6e] rounded-xl overflow-hidden shadow-sm">
      {/* Filters - Single Row with Icons */}
      <div className="bg-gray-50 py-3 px-4 border-b border-[#028b6e]/20">
        <div className="flex flex-wrap items-center gap-3">
          {/* Title filter */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Search title..."
              className={`py-1.5 px-2 border rounded-lg text-sm ${
                titleFilter 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
            />
          </div>
          
          {/* Placement filter */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <select 
              value={placementFilter}
              onChange={(e) => setPlacementFilter(e.target.value)}
              className={`py-1.5 px-2 border rounded-lg text-sm ${
                placementFilter !== "all" 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
            >
              <option value="all">All Placements</option>
              {placements.map(placement => (
                <option key={placement} value={placement}>{placement}</option>
              ))}
            </select>
          </div>
          
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          {/* Date range filters */}
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className={`py-1.5 px-2 border rounded-lg text-sm w-32 ${
                startDateFilter 
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
              placeholder="From Date"
            />
            <span className="text-gray-500">-</span>
            <input 
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className={`py-1.5 px-2 border rounded-lg text-sm w-32 ${
                endDateFilter
                  ? "border-[#028b6e] bg-green-50" 
                  : "border-gray-300"
              }`}
              placeholder="To Date"
            />
          </div>
          
          {/* Banners per page selector */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <select 
              value={bannersPerPage}
              onChange={(e) => setBannersPerPage(Number(e.target.value))}
              className="py-1.5 px-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value={5}>5/pg</option>
              <option value={10}>10/pg</option>
              <option value={20}>20/pg</option>
            </select>
          </div>
          
          {/* Clear filters button - Always visible but disabled if no filters active */}
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
      
      {/* Results summary */}
      <div className="p-4 text-sm text-gray-600 flex justify-between items-center border-b border-gray-100">
        <span>
          {isFilterActive ? (
            <span className="text-[#028b6e] font-medium">Filtered:</span>
          ) : (
            <span>Total:</span>
          )} {filteredBanners.length} banners
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
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Placement</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Updated On</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBanners.length > 0 ? (
              currentBanners.map((banner) => (
                <tr key={banner.id} className="border-t border-gray-100 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4">
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      className="w-16 h-10 object-cover rounded-md" 
                      onError={(e) => handleImageError(banner.id, banner.image, e)}
                    />
                  </td>
                  <td className="py-3 px-4">{banner.title}</td>
                  <td className="py-3 px-4">{banner.placement}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        banner.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{banner.startDate}</td>
                  <td className="py-3 px-4">{banner.endDate}</td>
                  <td className="py-3 px-4">{banner.updatedOn}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => onEdit(banner)} 
                        className="text-blue-500 hover:text-blue-700 hover:underline transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(banner)} 
                        className="text-red-500 hover:text-red-700 hover:underline transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No banners found.
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

export default BannerTable;