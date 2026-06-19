import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HeadcountChart = ({ data }) => {
  // Guard — if data is not a valid array, show message instead of crashing
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
        No headcount data available
      </p>
    );
  }

  const labels = data.map((d) => d.department);
  const values = data.map((d) => d.headcount);

  const chartData = {
    labels,
    datasets: [{
      label: "Headcount",
      data: values,
      backgroundColor: [
        "#4F46E5","#7C3AED","#EC4899","#F59E0B",
        "#10B981","#3B82F6","#EF4444","#8B5CF6"
      ],
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Department Headcount" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={chartData} options={options} />;
};

export default HeadcountChart;