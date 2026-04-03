import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_candidates: 0, total_interviews: 0, total_interviewers: 0, my_interviews: 0, pending: 0, interview: 0, hired: 0, rejected: 0, scheduled: 0, completed: 0, cancelled: 0 });
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      if (user?.role === "SUPER_HR" || user?.role === "HR_ASSISTANT") {
        const [c, i, iv] = await Promise.all([
          api.get("/recruitment/candidates/"),
          api.get("/recruitment/interviews/"),
          api.get("/users/interviewers/"),
        ]);
        const cd = c.data || [], id = i.data || [];
        setStats({
          total_candidates: cd.length, total_interviews: id.length,
          total_interviewers: iv.data?.length || 0,
          pending: cd.filter(x => x.status === "PENDING").length,
          interview: cd.filter(x => x.status === "INTERVIEW").length,
          hired: cd.filter(x => x.status === "HIRED").length,
          rejected: cd.filter(x => x.status === "REJECTED").length,
          scheduled: id.filter(x => x.status === "SCHEDULED").length,
          completed: id.filter(x => x.status === "COMPLETED").length,
          cancelled: id.filter(x => x.status === "CANCELLED").length,
          my_interviews: 0,
        });
        setRecentCandidates(cd.slice(-5).reverse());
        setRecentInterviews(id.slice(-5).reverse());
      } else {
        const r = await api.get("/recruitment/my-interviews/");
        const d = r.data || [];
        setStats({ ...stats, my_interviews: d.length, scheduled: d.filter(x => x.status === "SCHEDULED").length, completed: d.filter(x => x.status === "COMPLETED").length });
        setRecentInterviews(d.slice(-5).reverse());
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: "1rem" }}>
      <div style={S.spinner} />
      <p style={{ color: "#94a3b8" }}>Loading dashboard...</p>
    </div>
  );

  const isHR = user?.role === "SUPER_HR" || user?.role === "HR_ASSISTANT";
  const statusColors = { PENDING: "#f97316", INTERVIEW: "#3b82f6", HIRED: "#10b981", REJECTED: "#ef4444", SCHEDULED: "#3b82f6", COMPLETED: "#10b981", CANCELLED: "#ef4444" };

  return (
    <div style={S.container}>
      {/* Welcome */}
      <div style={S.welcome}>
        <div>
          <h1 style={S.title}>Welcome back, {user?.full_name?.split(" ")[0] || "there"}! 👋</h1>
          <p style={S.subtitle}>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <span style={S.rolePill}>{user?.role?.replace(/_/g, " ")}</span>
      </div>

      {/* Stats Cards */}
      <div style={S.statsGrid}>
        {isHR ? [
          { label: "Total Candidates", value: stats.total_candidates, icon: "👥", color: "#f97316", click: "/candidates" },
          { label: "Total Interviews", value: stats.total_interviews, icon: "📅", color: "#3b82f6", click: "/interviews" },
          { label: "Interviewers", value: stats.total_interviewers, icon: "🎯", color: "#8b5cf6", click: "/interviewers" },
          { label: "Upcoming", value: stats.scheduled, icon: "⏰", color: "#10b981", click: "/interviews" },
        ] : [
          { label: "My Interviews", value: stats.my_interviews, icon: "📋", color: "#f97316", click: "/my-interviews" },
          { label: "Upcoming", value: stats.scheduled, icon: "⏰", color: "#3b82f6", click: "/my-interviews" },
          { label: "Completed", value: stats.completed, icon: "✅", color: "#10b981", click: "/my-interviews" },
        ].map((s, i) => (
          <div key={i} onClick={() => navigate(s.click)} style={{ ...S.statCard, borderLeft: `4px solid ${s.color}`, cursor: "pointer" }}>
            <div style={{ fontSize: "2rem" }}>{s.icon}</div>
            <div>
              <div style={{ ...S.statNum, color: s.color }}>{s.value}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
            <div style={{ ...S.statBar, width: "100%" }}>
              <div style={{ ...S.statBarFill, backgroundColor: s.color, width: `${Math.min(s.value * 10, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {isHR && (
        <div style={S.grid2}>
          {/* Candidate Pipeline */}
          <div style={S.card}>
            <h3 style={S.cardTitle}>📊 Candidate Pipeline</h3>
            {[
              { label: "Pending Review", value: stats.pending, color: "#f97316" },
              { label: "In Interview", value: stats.interview, color: "#3b82f6" },
              { label: "Hired", value: stats.hired, color: "#10b981" },
              { label: "Rejected", value: stats.rejected, color: "#ef4444" },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span style={{ color: "#cbd5e1", fontSize: "0.875rem" }}>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: "bold" }}>{s.value}</span>
                </div>
                <div style={{ backgroundColor: "#0f172a", borderRadius: "99px", height: "8px", overflow: "hidden" }}>
                  <div style={{ backgroundColor: s.color, height: "100%", width: `${stats.total_candidates ? (s.value / stats.total_candidates * 100) : 0}%`, borderRadius: "99px", transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={S.card}>
            <h3 style={S.cardTitle}>⚡ Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "➕ Add New Candidate", path: "/candidates", color: "#f97316" },
                { label: "📅 Schedule Interview", path: "/interviews", color: "#3b82f6" },
                { label: "👤 Add Interviewer", path: "/interviewers", color: "#8b5cf6" },
                { label: "📊 View All Candidates", path: "/candidates", color: "#10b981" },
              ].map((a, i) => (
                <button key={i} onClick={() => navigate(a.path)}
                  style={{ backgroundColor: `${a.color}15`, color: a.color, border: `1px solid ${a.color}30`, padding: "0.75rem 1rem", borderRadius: "8px", cursor: "pointer", textAlign: "left", fontWeight: "600", fontSize: "0.875rem", transition: "all 0.2s" }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={S.grid2}>
        {/* Recent Candidates */}
        {isHR && (
          <div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={S.cardTitle}>👥 Recent Candidates</h3>
              <button onClick={() => navigate("/candidates")} style={S.viewAll}>View All →</button>
            </div>
            {recentCandidates.length === 0 ? (
              <p style={{ color: "#94a3b8", textAlign: "center", padding: "2rem" }}>No candidates yet</p>
            ) : recentCandidates.map((c, i) => (
              <div key={i} style={S.listItem}>
                <div style={S.listAvatar}>{c.first_name[0]}{c.last_name[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#f1f5f9", fontWeight: "600", fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.first_name} {c.last_name}</div>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{c.position}</div>
                </div>
                <span style={{ ...S.badge, backgroundColor: `${statusColors[c.status]}20`, color: statusColors[c.status] }}>{c.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recent Interviews */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={S.cardTitle}>📅 {isHR ? "Recent Interviews" : "My Interviews"}</h3>
            <button onClick={() => navigate(isHR ? "/interviews" : "/my-interviews")} style={S.viewAll}>View All →</button>
          </div>
          {recentInterviews.length === 0 ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: "2rem" }}>No interviews yet</p>
          ) : recentInterviews.map((iv, i) => (
            <div key={i} style={S.listItem}>
              <div style={{ ...S.listAvatar, backgroundColor: "#3b82f620", color: "#3b82f6" }}>📅</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#f1f5f9", fontWeight: "600", fontSize: "0.875rem" }}>{iv.candidate_name || `Interview #${iv.id}`}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{iv.interview_type} • {iv.scheduled_at ? new Date(iv.scheduled_at).toLocaleDateString() : "TBD"}</div>
              </div>
              <span style={{ ...S.badge, backgroundColor: `${statusColors[iv.status]}20`, color: statusColors[iv.status] }}>{iv.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = {
  container: { padding: "1.5rem 2rem", maxWidth: "1280px", margin: "0 auto" },
  welcome: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold", color: "#f1f5f9", marginBottom: "0.25rem" },
  subtitle: { color: "#94a3b8", fontSize: "0.875rem" },
  rolePill: { backgroundColor: "rgba(249,115,22,0.15)", color: "#f97316", padding: "0.35rem 1rem", borderRadius: "99px", fontSize: "0.8rem", fontWeight: "600", border: "1px solid rgba(249,115,22,0.3)" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" },
  statCard: { backgroundColor: "#1e293b", padding: "1.25rem", borderRadius: "12px", display: "flex", alignItems: "flex-start", gap: "1rem", transition: "transform 0.2s", position: "relative", flexDirection: "column" },
  statNum: { fontSize: "2rem", fontWeight: "bold", lineHeight: 1 },
  statLabel: { color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.2rem" },
  statBar: { height: "4px", backgroundColor: "#0f172a", borderRadius: "99px", overflow: "hidden", marginTop: "0.5rem" },
  statBarFill: { height: "100%", borderRadius: "99px", transition: "width 1s ease" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" },
  card: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px" },
  cardTitle: { color: "#f97316", fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" },
  viewAll: { backgroundColor: "transparent", border: "none", color: "#f97316", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" },
  listItem: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid #334155" },
  listAvatar: { width: "36px", height: "36px", backgroundColor: "rgba(249,115,22,0.2)", color: "#f97316", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.75rem", flexShrink: 0 },
  badge: { padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: "600", whiteSpace: "nowrap" },
  spinner: { width: "40px", height: "40px", border: "3px solid #334155", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 1s linear infinite" },
};

const ss = document.createElement("style");
ss.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(ss);
