import React, { useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import SalesChart from "../../components/Reports/SalesChart";
import TopCreatorsTable from "../../components/Reports/TopCreatorsTable";

// Example metrics data
const metricsData = [
  { 
    title: "Total Revenue", 
    value: "£14,580", 
    change: "+12.5%", 
    isPositive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    title: "New Creators", 
    value: "24", 
    change: "+8.3%", 
    isPositive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  { 
    title: "Total Orders", 
    value: "386", 
    change: "+15.2%", 
    isPositive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  { 
    title: "Avg. Order Value", 
    value: "£37.80", 
    change: "-2.4%", 
    isPositive: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState("month");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header with tabs */}
        <div className="bg-white rounded-2xl shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#028b6e]">Platform Reports</h1>
                <p className="text-gray-500 mt-1">Insights and analytics for your FoodieFan platform</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  <button 
                    onClick={() => setReportPeriod("week")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      reportPeriod === "week" 
                        ? 'bg-[#028b6e] text-white' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    This Week
                  </button>
                  <button 
                    onClick={() => setReportPeriod("month")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      reportPeriod === "month" 
                        ? 'bg-[#028b6e] text-white' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    This Month
                  </button>
                  <button 
                    onClick={() => setReportPeriod("year")}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      reportPeriod === "year" 
                        ? 'bg-[#028b6e] text-white' 
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    This Year
                  </button>
                </div>
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`flex items-center gap-2 bg-[#028b6e] text-white px-4 py-2 rounded-xl shadow hover:bg-[#026655] transition-colors ${
                    isExporting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isExporting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Export CSV
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metricsData.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${metric.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {metric.icon}
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-4 text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.isPositive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium">{metric.change}</span>
                <span className="text-gray-500">vs last {reportPeriod}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sales Chart - Row 1 */}
        <div className="mb-6">
          <SalesChart />
        </div>
        
        {/* Top Creators Table - Row 2 */}
        <div className="mb-6">
          <TopCreatorsTable />
        </div>
        
        {/* Additional reports section - Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-[#028b6e]">Popular Categories</h2>
            <div className="space-y-4">
              {['Recipe Books', 'Cookware', 'Cooking Classes', 'Specialty Ingredients'].map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#028b6e]"></div>
                    <span>{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#028b6e]" 
                        style={{ width: `${85 - (index * 15)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{85 - (index * 15)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-[#028b6e]">Recent Orders</h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#028b6e]">
                      #{(1000 + index).toString()}
                    </div>
                    <div>
                      <div className="font-medium">Order #{1000 + index}</div>
                      <div className="text-xs text-gray-500">23 Mar, 2025</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-right">£{(45 + index * 12).toFixed(2)}</div>
                    <div className="text-xs text-gray-500">3 items</div>
                  </div>
                </div>
              ))}
              <button className="text-[#028b6e] hover:text-[#026655] text-sm font-medium mt-2 flex items-center gap-1.5 transition-colors">
                View All Orders
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          Data refreshed on 23 Mar 2025, 15:30. Next refresh in 12 hours.
        </div>
      </div>
    </AdminLayout>
  );
}