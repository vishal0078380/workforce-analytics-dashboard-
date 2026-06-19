import React from "react";

const Navbar = ({ user, signOut }) => {
  const username = user?.signInDetails?.loginId || user?.username || "User";
  const groups = user?.signInUserSession?.idToken?.payload?.["cognito:groups"] || [];

  return (
    <nav style={{
      background: "#4F46E5", color: "#fff",
      padding: "0 24px", height: "60px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    }}>
      <div style={{ fontWeight: 700, fontSize: "18px" }}>
        🏢 Workforce Analytics Dashboard
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "14px" }}>
        <span>👤 {username}</span>
        {groups.length > 0 && (
          <span style={{
            background: "#818CF8", padding: "2px 10px",
            borderRadius: "12px", fontSize: "12px"
          }}>
            {groups[0]}
          </span>
        )}
        <button onClick={signOut} style={{
          background: "#EF4444", color: "#fff",
          border: "none", padding: "6px 16px",
          borderRadius: "6px", cursor: "pointer", fontWeight: 600
        }}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;