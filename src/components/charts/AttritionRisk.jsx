import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const riskColor = (score) => {
  if (score >= 50) return "#EF4444";
  if (score >= 40) return "#F59E0B";
  return "#10B981";
};

const AttritionRisk = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
        No attrition data available
      </p>
    );
  }

  const labels = data.map((d) => d.department.charAt(0).toUpperCase() + d.department.slice(1));
  const values = data.map((d) => d.risk_score);
  const colors = values.map((v) => riskColor(v));

  const chartData = {
    labels,
    datasets: [{
      label: "Avg Attrition Risk Score",
      data: values,
      backgroundColor: colors,
      borderRadius: 6,
    }],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Attrition Risk by Department" },
    },
    scales: {
      x: { beginAtZero: true, max: 100,
        title: { display: true, text: "Risk Score" } },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
      <div style={{ display: "flex", gap: "16px", justifyContent: "center",
        marginTop: "12px", fontSize: "12px" }}>
        <span>🔴 High (&ge;50)</span>
        <span>🟡 Medium (&ge;40)</span>
        <span>🟢 Low (&lt;40)</span>
      </div>
    </div>
  );
};

export default AttritionRisk;