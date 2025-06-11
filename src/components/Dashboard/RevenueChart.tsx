import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title,
  TooltipItem,
  Scale,
  CoreScaleOptions
} from 'chart.js';

// Register all required Chart.js components
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title
);

const RevenueChart: React.FC = () => {
  // Chart data with more months
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 500, 800, 1200, 1500, 2000],
        borderColor: '#028b6e',
        backgroundColor: 'rgba(2, 139, 110, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#028b6e',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#028b6e',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Enhanced chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#028b6e',
        borderColor: '#028b6e',
        borderWidth: 1,
        padding: 8,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#666',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderDash: [4, 4],
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#666',
          callback: function(this: Scale<CoreScaleOptions>, tickValue: number | string) {
            return `$${tickValue}`;
          }
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#028b6e]/50 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-bold text-gray-800">Monthly Revenue</h4>
        <div className="text-xs font-medium text-[#028b6e]">
          <span className="text-lg">$32,400</span>
          <span className="ml-1 text-green-500 text-xs">+16.4%</span>
        </div>
      </div>
      
      <div className="h-44">
        <Line data={data} options={options} />
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100 text-xs">
        <div className="text-gray-500">
          <span className="font-medium">↑ 16.4%</span> vs previous year
        </div>
        <button className="text-[#028b6e] font-medium hover:underline">
          View Report
        </button>
      </div>
    </div>
  );
};

export default RevenueChart;