import React from "react";

const metrics = [
  { label: "API Requests", icon: "📡", color: "#4F46E5" },
  { label: "Lambda Errors", icon: "⚠️", color: "#EF4444" },
  { label: "Avg Duration", icon: "⏱️", color: "#F59E0B" },
  { label: "Invocations", icon: "🔁", color: "#10B981" },
];

const SystemHealth = () => {
  return (
    <div>
      <h3 style={{ marginBottom: "12px", fontWeight: 600 }}>System Health</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            background: "#F9FAFB", borderRadius: "10px",
            padding: "16px", borderLeft: `4px solid ${m.color}`
          }}>
            <div style={{ fontSize: "24px" }}>{m.icon}</div>
            <div style={{ fontWeight: 600, color: "#374151", marginTop: "6px" }}>{m.label}</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>
              View in{" "}
              <a
                href="https://ap-south-1.console.aws.amazon.com/cloudwatch/home?region=ap-south-1#dashboards:name=workforce-monitoring"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#4F46E5" }}
              >
                CloudWatch →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;