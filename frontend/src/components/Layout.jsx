import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const isSuperHR = user?.role === "SUPER_HR";
  const isHRAssistant = user?.role === "HR_ASSISTANT";
  const isInterviewer = user?.role === "INTERVIEWER";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    color: isActive ? "#f97316" : "#cbd5e1",
    backgroundColor: isActive ? "#1f2937" : "transparent",
    textDecoration: "none",
    borderRadius: "8px",
    marginBottom: "0.25rem",
    transition: "all 0.2s",
  });

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <img src="/hr-hub-logo.svg" alt="HR-Hub" style={styles.logoImage} />
          <span style={styles.logoText}>HR-Hub</span>
        </div>
        
        <nav style={styles.nav}>
          <NavLink to="/" style={linkStyle}>📊 Dashboard</NavLink>
          
          {/* SUPER_HR and HR_ASSISTANT see these */}
          {(isSuperHR || isHRAssistant) && (
            <>
              <NavLink to="/candidates" style={linkStyle}>👥 Candidates</NavLink>
              <NavLink to="/interviews" style={linkStyle}>📅 Interviews</NavLink>
              <NavLink to="/interviewers" style={linkStyle}>🎯 Interviewers</NavLink>
            </>
          )}
          
          {/* Only SUPER_HR sees Audit Logs */}
          {isSuperHR && (
            <NavLink to="/audit-logs" style={linkStyle}>🔍 Audit Logs</NavLink>
          )}
          
          {/* Only INTERVIEWER sees My Interviews */}
          {isInterviewer && (
            <NavLink to="/my-interviews" style={linkStyle}>📋 My Interviews</NavLink>
          )}
        </nav>
        
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <span style={styles.userAvatar}>{user?.full_name?.[0] || user?.email?.[0]}</span>
            <div>
              <div style={styles.userName}>{user?.full_name || user?.email}</div>
              <div style={styles.userRole}>{user?.role?.replace("_", " ")}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh" },
  sidebar: { width: "260px", backgroundColor: "#111827", borderRight: "1px solid #374151", display: "flex", flexDirection: "column", position: "fixed", height: "100vh", overflowY: "auto" },
  logo: { padding: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid #374151" },
  logoImage: { width: "32px", height: "32px" },
  logoText: { fontSize: "1.25rem", fontWeight: "bold", color: "#f97316" },
  nav: { flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" },
  userSection: { padding: "1rem", borderTop: "1px solid #374151" },
  userInfo: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", padding: "0.5rem", backgroundColor: "#1f2937", borderRadius: "8px" },
  userAvatar: { width: "40px", height: "40px", backgroundColor: "#f97316", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1rem" },
  userName: { fontSize: "0.875rem", fontWeight: "bold" },
  userRole: { fontSize: "0.75rem", color: "#9ca3af" },
  logoutBtn: { width: "100%", padding: "0.5rem", backgroundColor: "#374151", border: "none", borderRadius: "6px", color: "white", cursor: "pointer" },
  main: { marginLeft: "260px", flex: 1, backgroundColor: "#0f172a", minHeight: "100vh" },
  content: { padding: "2rem" },
};
