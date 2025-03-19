'use client';

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
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = ({ data }) => {
  console.log("TrendChart received data:", data); // log the input data
  if (!data || !data.labels || !data.datasets) {
    return null;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: data.title || 'Trend Projection',
      },
    },
  };
try{
  return (
    <div
      className="mt-6 mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
      style={{ minHeight: '300px', minWidth: '100%' }}
    >
      <Line options={options} data={data} />
    </div>
  );
} catch (error) {
  console.error("Error rendering TrendChart:", error);
  return <p>Error rendering chart.</p>;
  }
};

export default TrendChart;