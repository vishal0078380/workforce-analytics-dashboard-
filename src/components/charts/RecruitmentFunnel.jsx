import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecruitmentFunnel = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
        No recruitment data available
      </p>
    );
  }

  const chartData = {
    labels: ["Resumes", "Shortlisted", "Interviewed", "Offered", "Joined"],
    datasets: [{
      label: "Candidates",
      data: [
        data.resumes || 0,
        data.shortlist || 0,
        data.interview || 0,
        data.offered || 0,
        data.joined || 0,
      ],
      backgroundColor: ["#6366F1","#8B5CF6","#A855F7","#EC4899","#10B981"],
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Recruitment Funnel" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={chartData} options={options} />;
};

export default RecruitmentFunnel;