import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total_candidates: 0,
    total_interviews: 0,
    total_interviewers: 0,
    my_interviews: 0,
    pending_candidates: 0,
    hired_candidates: 0,
    upcoming_interviews: 0,
    completed_interviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // For SUPER_HR or HR_ASSISTANT - get all data
      if (user?.role === "SUPER_HR" || user?.role === "HR_ASSISTANT") {
        const [candidates, interviews, interviewers] = await Promise.all([
          api.get("/recruitment/candidates/"),
          api.get("/recruitment/interviews/"),
          api.get("/users/interviewers/")
        ]);
        
        const candidatesData = candidates.data || [];
        const interviewsData = interviews.data || [];
        
        setStats({
          total_candidates: candidatesData.length,
          total_interviews: interviewsData.length,
          total_interviewers: interviewers.data?.length || 0,
          pending_candidates: candidatesData.filter(c => c.status === "PENDING").length,
          hired_candidates: candidatesData.filter(c => c.status === "HIRED").length,
          upcoming_interviews: interviewsData.filter(i => i.status === "SCHEDULED").length,
          completed_interviews: interviewsData.filter(i => i.status === "COMPLETED").length,
          my_interviews: 0
        });
      } 
      // For INTERVIEWER - only get their own interviews
      else if (user?.role === "INTERVIEWER") {
        const [myInterviews] = await Promise.all([
          api.get("/recruitment/my-interviews/")
        ]);
        
        const myInterviewsData = myInterviews.data || [];
        
        setStats({
          total_candidates: 0,
          total_interviews: 0,
          total_interviewers: 0,
          my_interviews: myInterviewsData.length,
          pending_candidates: 0,
          hired_candidates: 0,
          upcoming_interviews: myInterviewsData.filter(i => i.status === "SCHEDULED").length,
          completed_interviews: myInterviewsData.filter(i => i.status === "COMPLETED").length
        });
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // SUPER_HR or HR_ASSISTANT Dashboard
  if (user?.role === "SUPER_HR" || user?.role === "HR_ASSISTANT") {
    return (
      <div style={styles.container}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>Welcome, {user?.full_name?.split(" ")[0] || "Admin"}! 👋</h1>
          <p style={styles.subtitle}>Here's your recruitment dashboard overview</p>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <div style={styles.statNumber}>{stats.total_candidates}</div>
              <div style={styles.statLabel}>Total Candidates</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📅</div>
            <div>
              <div style={styles.statNumber}>{stats.total_interviews}</div>
              <div style={styles.statLabel}>Total Interviews</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🎯</div>
            <div>
              <div style={styles.statNumber}>{stats.total_interviewers}</div>
              <div style={styles.statLabel}>Interviewers</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏳</div>
            <div>
              <div style={styles.statNumber}>{stats.upcoming_interviews}</div>
              <div style={styles.statLabel}>Upcoming</div>
            </div>
          </div>
        </div>
        
        <div style={styles.secondaryGrid}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📊 Candidate Status</h3>
            <div style={styles.statusList}>
              <div style={styles.statusItem}>
                <span>Pending Review</span>
                <span style={styles.statusBadgePending}>{stats.pending_candidates}</span>
              </div>
              <div style={styles.statusItem}>
                <span>Hired</span>
                <span style={styles.statusBadgeHired}>{stats.hired_candidates}</span>
              </div>
              <div style={styles.statusItem}>
                <span>Completed Interviews</span>
                <span style={styles.statusBadgeCompleted}>{stats.completed_interviews}</span>
              </div>
            </div>
          </div>
          
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>⚡ Quick Actions</h3>
            <button style={styles.actionBtn} onClick={() => window.location.href = "/candidates"}>
              + Add New Candidate
            </button>
            <button style={styles.actionBtnOutline} onClick={() => window.location.href = "/interviews"}>
              📅 Schedule Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // INTERVIEWER Dashboard
  if (user?.role === "INTERVIEWER") {
    return (
      <div style={styles.container}>
        <div style={styles.welcomeSection}>
          <h1 style={styles.title}>Welcome, {user?.full_name?.split(" ")[0] || "Interviewer"}! 👋</h1>
          <p style={styles.subtitle}>Here's your interview schedule</p>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📋</div>
            <div>
              <div style={styles.statNumber}>{stats.my_interviews}</div>
              <div style={styles.statLabel}>My Interviews</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏳</div>
            <div>
              <div style={styles.statNumber}>{stats.upcoming_interviews}</div>
              <div style={styles.statLabel}>Upcoming</div>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div>
              <div style={styles.statNumber}>{stats.completed_interviews}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
          </div>
        </div>
        
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>📌 Interview Reminders</h3>
          <p style={styles.infoText}>
            You have <strong>{stats.upcoming_interviews}</strong> upcoming interviews.
            Click "My Interviews" to view details and submit feedback.
          </p>
          <button style={styles.actionBtn} onClick={() => window.location.href = "/my-interviews"}>
            View My Interviews →
          </button>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  container: { padding: "2rem" },
  welcomeSection: { marginBottom: "2rem" },
  title: { fontSize: "1.75rem", fontWeight: "bold", marginBottom: "0.5rem" },
  subtitle: { color: "#94a3b8" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" },
  statCard: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "1rem" },
  statIcon: { fontSize: "2rem" },
  statNumber: { fontSize: "1.75rem", fontWeight: "bold", color: "#f97316" },
  statLabel: { color: "#94a3b8", fontSize: "0.875rem" },
  secondaryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" },
  infoCard: { backgroundColor: "#1e293b", padding: "1.5rem", borderRadius: "12px" },
  infoTitle: { marginBottom: "1rem", fontSize: "1rem", color: "#f97316" },
  infoText: { color: "#94a3b8", marginBottom: "1rem", lineHeight: "1.5" },
  statusList: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  statusItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid #334155" },
  statusBadgePending: { backgroundColor: "rgba(249, 115, 22, 0.2)", color: "#f97316", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.875rem" },
  statusBadgeHired: { backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.875rem" },
  statusBadgeCompleted: { backgroundColor: "rgba(59, 130, 246, 0.2)", color: "#3b82f6", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.875rem" },
  actionBtn: { width: "100%", backgroundColor: "#f97316", color: "white", border: "none", padding: "0.75rem", borderRadius: "8px", cursor: "pointer", marginBottom: "0.75rem", fontWeight: "bold" },
  actionBtnOutline: { width: "100%", backgroundColor: "transparent", color: "#f97316", border: "1px solid #f97316", padding: "0.75rem", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  loading: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "400px", gap: "1rem" },
  spinner: { width: "40px", height: "40px", border: "3px solid #334155", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 1s linear infinite" }
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
