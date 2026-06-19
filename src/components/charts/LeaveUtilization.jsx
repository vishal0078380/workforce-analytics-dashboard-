import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeaveUtilization = ({ data }) => {
  // data = array of { department, utilization_percent }
  const labels = data.map((d) => d.department);
  const values = data.map((d) => d.utilization_percent || d.value);

  const chartData = {
    labels,
    datasets: [{
      label: "Leave Utilization (%)",
      data: values,
      backgroundColor: "#F59E0B",
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Leave Utilization by Department" },
    },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  return <Bar data={chartData} options={options} />;
};

export default LeaveUtilization;