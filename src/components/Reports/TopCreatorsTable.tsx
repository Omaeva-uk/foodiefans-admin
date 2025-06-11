import React, { useRef } from 'react';

const commissionRate = 0.15;

const dummyCreators = [
  {
    name: "Jamie Oliver",
    avatar: "/jamie.png",
    totalSales: 1500,
    growthRate: 12.5,  // Growth rate in percentage
    recipes: 28
  },
  {
    name: "Gordon Ramsay",
    avatar: "/gordon.png",
    totalSales: 1200,
    growthRate: 8.2,
    recipes: 35
  },
  {
    name: "Rick Stein",
    avatar: "/rick.png",
    totalSales: 1100,
    growthRate: 15.3,
    recipes: 22
  },
  {
    name: "Nigella Lawson",
    avatar: "/nigella.png",
    totalSales: 950,
    growthRate: 11.8,
    recipes: 18
  },
  {
    name: "Mary Berry",
    avatar: "/mary.png",
    totalSales: 850,
    growthRate: 7.2,
    recipes: 24
  }
];

export default function TopCreatorsTable() {
  const erroredImages = useRef(new Set<string>());

  const handleImageError = (name: string, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (erroredImages.current.has(name)) return;
    
    erroredImages.current.add(name);
    e.currentTarget.src = "/avatar-placeholder.jpg";
  };

  // Calculate total platform earnings
  const totalPlatformEarnings = dummyCreators.reduce((sum, creator) => {
    return sum + (creator.totalSales * commissionRate);
  }, 0);

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#028b6e]">Top Performing Creators</h2>
          <p className="text-gray-500 text-sm mt-1">Based on total sales revenue</p>
        </div>
        <div className="bg-[#028b6e]/10 p-3 rounded-xl">
          <div className="text-xs text-[#028b6e] font-medium">Total Platform Earnings</div>
          <div className="text-xl font-bold text-[#028b6e]">£{totalPlatformEarnings.toFixed(2)}</div>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-3 px-4 font-semibold">Creator</th>
              <th className="py-3 px-4 font-semibold">Recipes</th>
              <th className="py-3 px-4 font-semibold text-right">Total Sales</th>
              <th className="py-3 px-4 font-semibold text-right">Growth</th>
              <th className="py-3 px-4 font-semibold text-right">Platform Earnings</th>
            </tr>
          </thead>
          <tbody>
            {dummyCreators.map((creator, idx) => {
              const earnings = creator.totalSales * commissionRate;
              // Calculate percentage of top performer
              const percentOfTop = (creator.totalSales / dummyCreators[0].totalSales) * 100;
              
              return (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={creator.avatar} 
                          alt={creator.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                          onError={(e) => handleImageError(creator.name, e)}
                        />
                        {idx < 3 && (
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold
                            ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-amber-700'}`}>
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{creator.name}</div>
                        <div className="text-xs text-gray-500">Chef & Author</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      {creator.recipes}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-right">£{creator.totalSales.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                      ${creator.growthRate >= 10 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      {creator.growthRate}%
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div>
                      <div className="text-green-600 font-semibold">£{earnings.toFixed(2)}</div>
                      <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#028b6e] rounded-full" 
                          style={{ width: `${percentOfTop}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">Showing top {dummyCreators.length} creators</div>
        <button className="text-sm text-[#028b6e] hover:text-[#026655] font-medium flex items-center gap-1.5">
          View All Creators
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}