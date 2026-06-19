import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeadcountChart from "../components/charts/HeadcountChart";
import RecruitmentFunnel from "../components/charts/RecruitmentFunnel";
import LeaveUtilization from "../components/charts/LeaveUtilization";
import AttritionRisk from "../components/charts/AttritionRisk";
import OrgChart from "../components/OrgChart";
import SystemHealth from "../components/SystemHealth";
import {
  fetchAnalytics, fetchHeadcount, fetchLeaveUtilization,
  fetchRecruitmentFunnel, fetchAttritionRisk, fetchOrgChart,
} from "../services/api";

const KPICard = ({ title, value, icon, color }) => (
  <div style={{
    background: "#fff", borderRadius: "12px", padding: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    borderTop: `4px solid ${color}`, flex: 1, minWidth: "180px"
  }}>
    <div style={{ fontSize: "28px" }}>{icon}</div>
    <div style={{ fontSize: "28px", fontWeight: 700, color, marginTop: "8px" }}>{value}</div>
    <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>{title}</div>
  </div>
);

const Card = ({ children }) => (
  <div style={{
    background: "#fff", borderRadius: "12px", padding: "24px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  }}>
    {children}
  </div>
);

const Dashboard = ({ user, signOut }) => {
  const [analytics, setAnalytics] = useState(null);
  const [headcount, setHeadcount] = useState([]);
  const [leave, setLeave] = useState([]);
  const [funnel, setFunnel] = useState({});
  const [attrition, setAttrition] = useState([]);
  const [orgChart, setOrgChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [a, h, l, r, at, o] = await Promise.all([
          fetchAnalytics(),
          fetchHeadcount(),
          fetchLeaveUtilization(),
          fetchRecruitmentFunnel(),
          fetchAttritionRisk(),
          fetchOrgChart(),
        ]);

        // Log all responses so we can see exact shapes
        console.log("ANALYTICS:", a);
        console.log("HEADCOUNT:", h);
        console.log("LEAVE:", l);
        console.log("FUNNEL:", r);
        console.log("ATTRITION:", at);
        console.log("ORGCHART:", o);

        // analytics — keys from your Lambda: total_headcount, departments, avg_attrition_risk, funnel_joined
        setAnalytics(a && typeof a === "object" ? a : {});

        // headcount — Lambda returns array of { department, headcount }
        setHeadcount(Array.isArray(h) ? h : []);

        // leave — Lambda returns array of { department, utilisation }
        setLeave(Array.isArray(l) ? l : []);

        // funnel — Lambda returns object { resumes, shortlist, interview, offered, joined }
        setFunnel(r && typeof r === "object" && !Array.isArray(r) ? r : {});

        // attrition — Lambda returns array of { department, risk_score }
        setAttrition(Array.isArray(at) ? at : []);

        // orgchart — nested JSON tree
        setOrgChart(o && typeof o === "object" ? o : null);

      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load dashboard data. Check console for details.");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) return (
    <div style={{
      display: "flex", justifyContent: "center",
      alignItems: "center", height: "100vh",
      fontSize: "18px", color: "#4F46E5"
    }}>
      ⏳ Loading Workforce Analytics...
    </div>
  );

  if (error) return (
    <div style={{ padding: "40px", color: "#EF4444", fontSize: "16px" }}>
      ❌ {error}
      <br />
      <small style={{ color: "#6B7280" }}>Open browser console (F12) for details.</small>
    </div>
  );

  return (
    <div style={{ background: "#F3F4F6", minHeight: "100vh" }}>
      <Navbar user={user} signOut={signOut} />

      <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>

        {/* ── KPI Summary Cards ── */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          <KPICard
            title="Total Headcount"
            value={analytics && analytics.total_headcount ? analytics.total_headcount : "—"}
            icon="👥"
            color="#4F46E5"
          />
          <KPICard
            title="Departments"
            value={analytics && analytics.departments ? analytics.departments : "—"}
            icon="🏢"
            color="#7C3AED"
          />
          <KPICard
            title="Avg Attrition Risk"
            value={analytics && analytics.avg_attrition_risk ? analytics.avg_attrition_risk + "%" : "—"}
            icon="⚠️"
            color="#EF4444"
          />
          <KPICard
            title="Total Hires Joined"
            value={analytics && analytics.funnel_joined ? analytics.funnel_joined : "—"}
            icon="🚀"
            color="#10B981"
          />
        </div>

        {/* ── Row 1: Headcount + Recruitment Funnel ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr",
          gap: "20px", marginBottom: "24px"
        }}>
          <Card>
            {headcount.length > 0
              ? <HeadcountChart data={headcount} />
              : <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
                  No headcount data available
                </p>
            }
          </Card>
          <Card>
            {Object.keys(funnel).length > 0
              ? <RecruitmentFunnel data={funnel} />
              : <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
                  No recruitment data available
                </p>
            }
          </Card>
        </div>

        {/* ── Row 2: Leave Utilization + Attrition Risk ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "20px", marginBottom: "24px"
        }}>
          <Card>
            {leave.length > 0
              ? <LeaveUtilization data={leave} />
              : <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
                  No leave data available
                </p>
            }
          </Card>
          <Card>
            {attrition.length > 0
              ? <AttritionRisk data={attrition} />
              : <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>
                  No attrition data available
                </p>
            }
          </Card>
        </div>

        {/* ── Row 3: Org Chart ── */}
        <Card>
          <h3 style={{ marginBottom: "16px", fontWeight: 600 }}>
            🌳 Organization Chart
          </h3>
          {orgChart
            ? <OrgChart data={orgChart} />
            : <p style={{ color: "#9CA3AF" }}>Org chart data not available</p>
          }
        </Card>

        {/* ── Row 4: System Health ── */}
        <div style={{ marginTop: "24px" }}>
          <Card><SystemHealth /></Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;