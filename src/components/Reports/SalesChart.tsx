import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler,
  TooltipItem,
  Scale,
  CoreScaleOptions,
  ChartOptions,
  ChartDataset
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

// Define a type for dataset to improve type safety
interface SalesDataset extends ChartDataset<'line'> {
  data: number[];
}

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Sales in £',
      data: [500, 700, 800, 900, 750, 950, 1200],
      borderColor: '#028b6e',
      backgroundColor: 'rgba(2, 139, 110, 0.1)',
      pointBackgroundColor: '#028b6e',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
    } as SalesDataset,
  ],
};

const weeklyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Sales in £',
      data: [280, 350, 410, 320],
      borderColor: '#028b6e',
      backgroundColor: 'rgba(2, 139, 110, 0.1)',
      pointBackgroundColor: '#028b6e',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
    } as SalesDataset,
  ],
};

const yearlyData = {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Sales in £',
      data: [3500, 5200, 7800, 9500, 12000],
      borderColor: '#028b6e',
      backgroundColor: 'rgba(2, 139, 110, 0.1)',
      pointBackgroundColor: '#028b6e',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
    } as SalesDataset,
  ],
};

// Chart options with explicit typing
const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      padding: 10,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: function(context: TooltipItem<'line'>) {
          // Safe type conversion
          const rawValue = typeof context.parsed.y === 'number' 
            ? context.parsed.y 
            : 0;
          return `£${rawValue.toLocaleString()}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        tickColor: 'transparent',
   
        
      },
      ticks: {
        callback: function(this: Scale<CoreScaleOptions>, value: number | string) {
          // Ensure value is a number
          const numValue = typeof value === 'string' 
            ? parseFloat(value) 
            : value;
          return '£' + numValue.toLocaleString();
        },
        font: {
          size: 11
        }
      }
    },
    x: {
      grid: {
        display: false
      },
    
      ticks: {
        font: {
          size: 11
        }
      }
    }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  elements: {
    line: {
      borderWidth: 3
    }
  },
  animation: {
    duration: 1000
  }
};

export default function SalesChart() {
  const [timeframe, setTimeframe] = useState<string>('monthly');
  const [salesTotal, setSalesTotal] = useState<number>(5800);
  const [salesGrowth, setSalesGrowth] = useState<number>(23.5);
  
  // Change data and stats based on timeframe
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    
    if (newTimeframe === 'weekly') {
      setSalesTotal(1360);
      setSalesGrowth(12.8);
    } else if (newTimeframe === 'monthly') {
      setSalesTotal(5800);
      setSalesGrowth(23.5);
    } else if (newTimeframe === 'yearly') {
      setSalesTotal(38000);
      setSalesGrowth(26.3);
    }
  };

  // Return the appropriate data based on timeframe
  const getChartData = () => {
    switch(timeframe) {
      case 'weekly':
        return weeklyData;
      case 'yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  };
  
  // Calculate and format highest and lowest values
  const getCurrentData = () => {
    const dataPoints = getChartData().datasets[0].data;
    const highest = Math.max(...dataPoints);
    const lowest = Math.min(...dataPoints);
    const lastPoint = dataPoints[dataPoints.length - 1];
    const periodLabel = timeframe === 'weekly' ? 'Current Week' : 
                         timeframe === 'yearly' ? 'Current Year' : 'Current Month';
    
    return { highest, lowest, lastPoint, periodLabel };
  };
  
  const { highest, lastPoint, periodLabel } = getCurrentData();

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#028b6e]">Sales Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Analyze your platform sales performance</p>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => handleTimeframeChange('weekly')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              timeframe === 'weekly' 
                ? 'bg-[#028b6e] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => handleTimeframeChange('monthly')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              timeframe === 'monthly' 
                ? 'bg-[#028b6e] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => handleTimeframeChange('yearly')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              timeframe === 'yearly' 
                ? 'bg-[#028b6e] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#028b6e]/10 p-4 rounded-xl">
          <div className="text-sm text-[#028b6e]">Total Sales</div>
          <div className="text-2xl font-bold">£{salesTotal.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="text-sm text-gray-600">{periodLabel}</div>
          <div className="text-2xl font-bold">£{lastPoint.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="text-sm text-gray-600">Highest Sale</div>
          <div className="text-2xl font-bold">£{highest.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl">
          <div className="text-sm text-gray-600">Growth</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">{salesGrowth}%</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Chart container with fixed height for better appearance */}
      <div className="h-72 mt-4">
        <Line data={getChartData()} options={options} />
      </div>
      
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div>Sales data last updated on 23 Mar 2025</div>
        <button className="text-[#028b6e] hover:text-[#026655] font-medium flex items-center gap-1.5">
          Export Data
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}