import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function GoalProgressChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: data.goals.map((goal) => ({
      label: goal.name,
      data: goal.progress,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      tension: 0.1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Goal Progress Over Time',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default GoalProgressChart;